/* Account Info */

export const getUserInfo = [
  {
    userId: 1,
    name: "GoDutch Test",
    email: "godutchtest@gmail.com",
  },
];

/* Home Tab */

export const getUserRelationsOwing = [
  {
    userId: 1,
    name: "Justin",
    netAmount: -30.5,
    transactions: [
      { name: "Dinner", amount: -30.5, id: 1 },
      { name: "Volleyball", amount: 5, id: 2 },
      { name: "Soccer", amount: -5, id: 3 },
    ],
  },
  {
    userId: 2,
    name: "Felix",
    netAmount: -10.0,
    transactions: [{ name: "Dinner", amount: -10, id: 1 }],
  },
  {
    userId: 3,
    name: "Steven",
    netAmount: -42.15,
    transactions: [{ name: "Dinner", amount: -10, id: 1 }],
  },
];

export const getUserRelationsOwed = [
  {
    userId: 1,
    name: "John",
    netAmount: 20,
    transactions: [{ name: "Dinner", amount: 20, id: 1 }],
  },
  {
    userId: 2,
    name: "Mary",
    netAmount: 10.0,
    transactions: [{ name: "Dinner", amount: 10, id: 1 }],
  },
  {
    userId: 3,
    name: "Steven",
    netAmount: 25,
    transactions: [{ name: "Dinner", amount: 25, id: 1 }],
  },
];

/* Groups Tab */

export const getAllRelatedGroups = [
  {
    groupName: "Friday Dinner",
    netAmount: -30.5,
    groupId: 1,
  },
  {
    groupName: "Roadtrip",
    netAmount: 23.5,
    groupId: 2,
  },
  {
    groupName: "Friends",
    netAmount: 44.5,
    groupId: 3,
  },
  {
    groupName: "Groupppp",
    netAmount: 4.5,
    groupId: 4,
  },
];

/* Group Tab */

export const getGroupInfo = [
  {
    groupName: "Friday Dinner",
    groupUsers: [
      { name: "Francis", id: 1 },
      { name: "Felix", id: 2 },
      { name: "Steven", id: 3 },
    ],
    budget: 100.0,
    remainingBudget: 20,
    netAmount: 30.5,
    groupId: 1,
    membersOwing: [
      {
        userId: 1,
        name: "Justin",
        netAmount: -30.5,
        transactions: [
          { name: "Dinner", amount: -30.5, id: 1 },
          { name: "Volleyball", amount: 5, id: 2 },
        ],
      },
      {
        userId: 2,
        name: "Francis",
        netAmount: -30.5,
        transactions: [
          { name: "Dinner", amount: -20.5, id: 1 },
          { name: "Transport", amount: -5, id: 2 },
        ],
      },
    ],
    membersOwed: [
      {
        userId: 1,
        name: "Felix",
        netAmount: 40.5,
        transactions: [{ name: "Soccer", amount: -20.5, id: 1 }],
      },
      {
        userId: 2,
        name: "Steven",
        netAmount: 10,
        transactions: [
          { name: "Dinner", amount: -30.5, id: 1 },
          { name: "Transport", amount: -5, id: 2 },
        ],
      },
    ],
  },
];

/* AddExpense Page */

export const getAllGroups = [
  {
    groupName: "Friday Dinner",
    netAmount: -30.5,
    groupId: 1,
    budget: 10,
    groupUsers: [
      { name: "Francis", id: 1 },
      { name: "Felix", id: 2 },
      { name: "Steven", id: 3 },
    ],
  },
  {
    groupName: "Roadtrip",
    netAmount: 23.5,
    groupId: 2,
    budget: 15,
    groupUsers: [
      { name: "Francis", id: 1 },
      { name: "Felix", id: 2 },
    ],
  },
  {
    groupName: "Friends",
    netAmount: 44.5,
    groupId: 3,
    budget: 0,
    groupUsers: [{ name: "Steven", id: 3 }],
  },
  {
    groupName: "Groupppp",
    netAmount: 4.5,
    groupId: 4,
    budget: 20,
    groupUsers: [
      { name: "Felix", id: 2 },
      { name: "Steven", id: 3 },
    ],
  },
];
