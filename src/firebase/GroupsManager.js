import { db } from "../../config/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { customAlphabet } from "nanoid/non-secure";
import { getUserData } from "./Authentication";

/**
 * Create new group and add the current user to the group
 * @param {String} userId
 * @param {String} groupName
 * @param {String} budget
 */
export const createGroup = async (userId, groupName, budget) => {
  const numericBudget = parseFloat(budget);
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);
  const groupsCollection = db.collection("groups");

  let groupId = nanoid();
  let groupDocRef = groupsCollection.doc(groupId);
  let docSnapshot = await groupDocRef.get();

  // generate a new id if a group already exists with the current generated id
  while (docSnapshot.exists) {
    groupId = nanoid();
    groupDocRef = groupsCollection.doc(groupId);
    docSnapshot = await groupDocRef.get();
  }

  const group = {
    uid: groupId,
    name: groupName,
    members: [userId],
    budget: numericBudget,
    remainingBudget: numericBudget,
  };
  groupDocRef.set(group);

  // add group to user document
  const userGroup = {
    groupId: groupId,
    netAmount: 0.0,
  };

  await db
    .collection("users")
    .doc(userId)
    .collection("groups")
    .doc(groupId)
    .set(userGroup);

  return groupId;
};

/**
 * Add current user to a group
 * @param {String} userId
 * @param {String} joinCode
 * @returns True if group is successfully joined, false if join code does not exist
 */
export const joinGroup = async (userId, joinCode, setError, setLoading) => {
  // check if user has already joined this group
  const existingUserGroup = await db
    .collection("users")
    .doc(userId)
    .collection("groups")
    .doc(joinCode)
    .get();
  if (existingUserGroup.exists) {
    return true;
  }

  const groupRef = db.collection("groups").doc(joinCode);
  const groupSnapshot = await groupRef.get();
  // check if join code is valid
  if (groupSnapshot.exists) {
    // add user to list of members in group
    await groupRef.update({
      members: firebase.firestore.FieldValue.arrayUnion(userId),
    });

    // add group to user document
    const userGroup = {
      groupId: joinCode,
      netAmount: 0.0,
    };

    await db
      .collection("users")
      .doc(userId)
      .collection("groups")
      .doc(joinCode)
      .set(userGroup);

    return true;
  } else {
    // invalid group id
    setError("Invalid join code");
    setLoading(false);
    return false;
  }
};

/**
 * Update the name and budget for a group
 * @param {String} uid the ID of the group to update
 * @param {String} name
 * @param {String} budget
 */
export const updateGroup = async (uid, name, budget) => {
  const numericBudget = parseFloat(budget);
  const groupRef = db.collection("groups").doc(uid);
  const groupSnapshot = await groupRef.get();
  const groupData = groupSnapshot.data();

  // recalculate remaining budget
  const newRemainingBudget =
    (isNaN(groupData.remainingBudget) ? 0 : groupData.remainingBudget) +
    numericBudget -
    (isNaN(groupData.budget) ? 0 : groupData.budget);

  await groupRef.update({
    name: name,
    budget: numericBudget,
    remainingBudget: newRemainingBudget,
  });
};

/**
 * Get array of groups that the user is in
 * @param {String} userId
 * @returns {Promise<{
 *  totalAmount: Number,
 *  groups: [{
 *    groupId: String,
 *    netAmount: Number,
 *    groupName: String,
 *  }]
 * }>}
 * If there are no groups, totalAmount is 0 and groups is an empty array.
 */
export const getGroups = async (userId) => {
  const returnObject = { totalAmount: 0.0, groups: [] };

  const snapshot = await db
    .collection("users")
    .doc(userId)
    .collection("groups")
    .get();

  if (snapshot.docs.length > 0) {
    // get name of each group
    const userGroupsData = snapshot.docs.map((doc) => doc.data());
    await Promise.all(
      userGroupsData.map(async (userGroup) => {
        const groupSnapshot = await db
          .collection("groups")
          .doc(userGroup.groupId)
          .get();
        userGroup.groupName = groupSnapshot.data().name;

        returnObject.totalAmount += userGroup.netAmount;
      })
    );

    returnObject.groups = userGroupsData;
  }

  return returnObject;
};

/**
 * Get group information and transactions for the user in this group
 * @param {String} userId
 * @param {String} groupId
 * @returns {Promise<{
 *  budget: Number,
 *  members: [{
 *    memberId: String,
 *    name: String,
 * }],
 *  name: String,
 *  remainingBudget: Number,
 *  uid: String,
 *  netAmount: Number,
 *  interactions: [{
 *    userId: String
 *    netAmount: Number,
 *    transactions: [{
 *      name: String,
 *      amount: Number,
 *    }]
 *  }],
 * }>}
 */
export const getSingleGroup = async (userId, groupId) => {
  const userGroupRef = db
    .collection("users")
    .doc(userId)
    .collection("groups")
    .doc(groupId);

  const userGroupSnapshot = await userGroupRef.get();
  const userGroupData = userGroupSnapshot.data();

  const groupSnapshot = await db.collection("groups").doc(groupId).get();
  const groupData = groupSnapshot.data();
  groupData.memberIds = groupData.members;
  groupData.members = [];
  Promise.all(
    groupData.memberIds.map(async (memberId) => {
      const userSnapshot = await db.collection("users").doc(memberId).get();
      groupData.members.push({
        memberId: memberId,
        name: userSnapshot.data().name,
      });
    })
  );

  let interactionsData = [];

  await userGroupRef
    .collection("interactions")
    .get()
    .then(async (snapshot) => {
      await Promise.all(
        snapshot.docs?.map(async (interaction) => {
          const interactionData = interaction.data();
          return db
            .collection("users")
            .doc(interactionData.userId)
            .get()
            .then((userSnapshot) => {
              interactionData.name = userSnapshot.data().name;
              interactionsData.push(interactionData);
            });
        })
      );
    });

  groupData.netAmount = userGroupData.netAmount;
  groupData.interactions = interactionsData;
  return groupData;
};
