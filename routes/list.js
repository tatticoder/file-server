const fs = require("fs");
//replace with path of folder you want to read
const directoryPath = "/media/stardust/songs/dhup_chik";
exports.listDir = function (req, res) {
  //for subfolders in this folder
  let requestedPath = req.query.name || directoryPath;
  console.log("going ot scan :" + requestedPath);
  fs.readdir(requestedPath, function (err, files) {
    //handling error
    if (err) {
      res.render("error", { err: JSON.stringify(err) });
      return console.error("Unable to scan directory: " + err);
    }
    res.render("index", { list: files, base: requestedPath });
  });
};
