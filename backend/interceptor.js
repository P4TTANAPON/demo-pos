const verify1 = (req, res, next) => {
  if (req.query.token == "1234") {
    next();
  } else {
    res.end("No Authorized1");
  }
};

const verify2 = (req, res, next) => {
  if (req.query.level == "admin") {
    next();
  } else {
    res.end("Level is not enough");
  }
};

module.exports = { verify1, verify2 };
