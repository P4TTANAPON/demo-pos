const express = require("express");
const router = express.Router();
const Transactions = require("./models/trans_schema");

router.get("/transaction", async (req, res) => {
  const doc = await Transactions.aggregate([
    { $sort: { timestamp: -1 } },
    {
      $lookup: {
        from: "users",
        localField: "staff_id",
        foreignField: "_id",
        as: "staff",
      },
    },
    {
      $unwind: "$staff",
    },
    {
      $set: { staff_id: "$staff.username" },
    },
    {
      $addFields: {
        id: "$transaction_id",
      },
    },
    {
      $project: { staff: 0, transaction_id: 0 },
    },
    // {
    //   $match: {
    //     timestamp: {
    //       $gte: new Date("2018-01-01"),
    //       $lt: new Date("2020-09-30"),
    //     },
    //   },
    // },
  ]);
  res.json(doc);
});

router.post("/transaction", async (req, res) => {

  req.body.staff_id = req.userId
  const doc = await Transactions.create(req.body);
  res.json({ result: "ok", doc });
});

module.exports = router;