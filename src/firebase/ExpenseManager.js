import { db } from "../../config/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

/**
 *
 * @param {String} userId current user making the expense
 * @param {[{
 *  userId: String,
 *  amount: Number,
 * }]} targetUserAmountList expect amount to always be positive, list excludes current user
 * @param {String} expenseName
 * @param {String} groupId
 * @param {Number} totalAmount
 */
export const createExpense = async (
  userId,
  targetUserAmountList,
  expenseName,
  groupId,
  totalAmount
) => {
  totalAmount = parseFloat(totalAmount);
  // update remaining budget value for group
  await db
    .collection("groups")
    .doc(groupId)
    .update({
      remainingBudget: firebase.firestore.FieldValue.increment(-totalAmount),
    });

  // add transactions to the users involved
  await Promise.all(
    targetUserAmountList.map(async (targetUserAmount) => {
      const transaction = {
        expenseName: expenseName,
        amount: parseFloat(targetUserAmount.amount),
      };
      await addTransaction(
        userId,
        targetUserAmount.userId,
        groupId,
        transaction
      );

      transaction.amount *= -1;
      await addTransaction(
        targetUserAmount.userId,
        userId,
        groupId,
        transaction
      );
    })
  );
};

const addTransaction = async (
  userId,
  interactionUserId,
  groupId,
  transaction
) => {
  const userGroupRef = db
    .collection("users")
    .doc(userId)
    .collection("groups")
    .doc(groupId);

  await userGroupRef.update({
    netAmount: firebase.firestore.FieldValue.increment(transaction.amount),
  });

  const interactionRef = userGroupRef
    .collection("interactions")
    .doc(interactionUserId);
  const interactionSnapshot = await interactionRef.get();

  if (interactionSnapshot.exists) {
    await interactionRef.update({
      netAmount: firebase.firestore.FieldValue.increment(transaction.amount),
      transactions: interactionSnapshot
        .data()
        .transactions.concat([transaction]),
    });
  } else {
    await interactionRef.set({
      userId: interactionUserId,
      netAmount: transaction.amount,
      transactions: [transaction],
    });
  }
};

/**
 *
 * @param {String} userId
 * @returns {Promise<[{
 *  groupName: String,
 *  groupId: String,
 *  remainingBudget: Number,
 *  members: [{
 *    userId: String,
 *    name: String,
 *  }]
 * }]>}
 */
export const getAddExpenseScreen = async (userId) => {
  const snapshot = await db
    .collection("users")
    .doc(userId)
    .collection("groups")
    .get();

  let resultArray = [];
  if (snapshot.docs.length > 0) {
    const userGroupsData = snapshot.docs.map((doc) => doc.data());
    await Promise.all(
      userGroupsData.map(async (userGroup) => {
        const groupSnapshot = await db
          .collection("groups")
          .doc(userGroup.groupId)
          .get();

        const group = {
          groupName: groupSnapshot.data().name,
          groupId: userGroup.groupId,
          remainingBudget: groupSnapshot.data().remainingBudget,
          members: [],
        };

        await Promise.all(
          groupSnapshot.data().members.map(async (memberId) => {
            const userSnapshot = await db
              .collection("users")
              .doc(memberId)
              .get();
            group.members.push({
              userId: memberId,
              name: userSnapshot.data().name,
            });
          })
        );
        resultArray.push(group);
      })
    );
  }

  return resultArray;
};

/**
 *
 * @param {String} payerId current user doing the repayment
 * @param {String} payeeId user being paid back
 */
export const paybackAllExpenses = async (payerId, payeeId) => {
  const GroupsListSnapshot = await db
    .collection("users")
    .doc(payerId)
    .collection("groups")
    .get();
  await Promise.all(
    GroupsListSnapshot.docs.map(async (groupSnapshot) => {
      const groupId = groupSnapshot.data().groupId;
      await clearInteractions(payerId, payeeId, groupId);
      await clearInteractions(payeeId, payerId, groupId);
    })
  );
};

/**
 *
 * @param {String} payerId current user doing the repayment
 * @param {String} payeeId user being paid back
 * @param {String} groupId the group that this repayment is for
 */
export const paybackExpensesPerGroup = async (payerId, payeeId, groupId) => {
  await clearInteractions(payerId, payeeId, groupId);
  await clearInteractions(payeeId, payerId, groupId);
};

const clearInteractions = async (userId, interactionUserId, groupId) => {
  const groupRef = db
    .collection("users")
    .doc(userId)
    .collection("groups")
    .doc(groupId);
  const interactionRef = groupRef
    .collection("interactions")
    .doc(interactionUserId);

  const interactionSnapshot = await interactionRef.get();
  if (!interactionSnapshot.exists) {
    return;
  }

  const paybackAmount = interactionSnapshot.data().netAmount;

  await groupRef.update({
    netAmount: firebase.firestore.FieldValue.increment(-paybackAmount),
  });
  await interactionRef.delete();
};

/**
 *
 * @param {String} userId
 * @returns {Promise<{
 *  totalAmount: Number,
 *  users: [{
 *    userId: String,
 *    name: String,
 *    netAmount: Number,
 *    transactions: [{
 *      expenseName: String,
 *      amount: Number,
 *    }]
 *  }]
 * }>}
 */
export const getHomeScreenData = async (userId) => {
  const returnObject = { totalAmount: 0.0, users: [] };
  let usersMap = new Map();

  const groupsRef = db.collection("users").doc(userId).collection("groups");
  const groupsSnapshot = await groupsRef.get();

  await Promise.all(
    groupsSnapshot.docs.map(async (group) => {
      const groupData = group.data();
      returnObject.totalAmount += groupData.netAmount;

      const interactionsSnapshot = await groupsRef
        .doc(groupData.groupId)
        .collection("interactions")
        .get();
      await Promise.all(
        interactionsSnapshot.docs.map(async (interaction) => {
          const interactionData = interaction.data();
          return db
            .collection("users")
            .doc(interactionData.userId)
            .get()
            .then((userSnapshot) => {
              const userOverall = usersMap.get(interactionData.userId);
              if (userOverall) {
                userOverall.netAmount += interactionData.netAmount;
                userOverall.transactions = userOverall.transactions.concat(
                  interactionData.transactions
                );
              } else {
                const newUserOverall = {
                  userId: interactionData.userId,
                  name: userSnapshot.data().name,
                  netAmount: interactionData.netAmount,
                  transactions: interactionData.transactions,
                };
                usersMap.set(interactionData.userId, newUserOverall);
              }
            });
        })
      );
    })
  );

  returnObject.users = Array.from(usersMap.values());
  return returnObject;
};
