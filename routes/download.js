const fs = require("fs");
exports.download = (req, res) => {
  try {
    console.log("User wants :", req.query.name);
    fs.createReadStream(req.query.name).pipe(res);
  } catch (err) {
    console.error(err);
    res.render("error", { err: JSON.stringify(err) });
  }
};
