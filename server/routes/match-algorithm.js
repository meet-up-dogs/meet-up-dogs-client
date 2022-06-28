import express from "express";

const locationUser1 = {
  bottomLeft: [52.540611691599544, 13.272677876569658],
  topRight: [52.54718549935826, 13.29775299525641],
};

const users = [
  {
    name: "user1",
    bottomLeft: [52.540611691123456, 13.272677876569658],
    topRight: [52.54718549935826, 13.29775299525641],
  },

  {
    name: "user2",
    bottomLeft: [52.540611691654321, 13.272677876569658],
    topRight: [52.54718549935826, 13.29775299525641],
  },

  {
    name: "user3",
    bottomLeft: [52.540611691987123, 13.272677876569658],
    topRight: [52.54718549935826, 13.29775299525641],
  },
];

const Nrange = [52.540611691599544, 52.54718549935826];
const Erange = [13.272677876569658, 13.29775299525641];

const res = users.filter((user) => {
  for (let i = user.bottomLeft[0]; i < user.topRight[0]; i += 0.0001) {
    console.log(i);
    if (i > Nrange[0] && i < Nrange[1]) {
      console.log("Match");
    }
  }
});

console.log(res);
