const express = require("express");
const router = express.Router();
const Users = require("./models/user_schema");
var bcrypt = require("bcryptjs");
const jwt = require("./jwt");
const refreshTokens = {};

// login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const doc = await Users.findOne({ username });
    if (doc && bcrypt.compareSync(password, doc.password)) {
      const payload = {
        id: doc._id,
        level: doc.level,
        username: doc.username,
      };

      const token = jwt.sign(payload, "10000"); // expire in ms.
      // const refreshToken = randtoken.uid(256); // 12341234
      // refreshTokens[refreshToken] = req.body.username;

      res.json({ result: "ok", token /*, refreshToken*/ });
    } else {
      res.json({ result: "nok", token: "", error: "invalid account" });
    }
  } catch (e) {
    res.json({ result: "nok", token: "", error: e });
  }
});

// register
router.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const doc = await Users.create(req.body);

    res.json({ result: "ok", doc });
  } catch (error) {
    res.json({ result: "nok", error });
  }
});

// Refresh Token
let count = 1;
router.post("/refresh/token", function (req, res) {
  const refreshToken = req.body.refreshToken;
  console.log("Refresh Token : " + count++);

  if (refreshToken in refreshTokens) {
    const payload = {
      username: refreshTokens[refreshToken],
      level: "normal",
    };
    const token = jwt.sign(payload, "20000"); // unit is millisec
    res.json({ jwt: token });
  } else {
    console.log("Not found");
    return res
      .status(403)
      .json({ auth: false, message: "Invalid refresh token" });
  }
});
module.exports = router;