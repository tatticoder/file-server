const fs = require("fs");
const path = require("path");
exports.showGal = (req, res) => {
  const resPath = req.query.path;
  if (fs.lstatSync(resPath).isDirectory()) {
    console.log("opening gallery in :" + resPath);
    // do some magic scan all files, take out images, send a list of images
    fs.readdir(resPath, function (err, files) {
      //handling error
      if (err) {
        res.render("error", { err: JSON.stringify(err) });
        return console.error("Unable to scan directory: " + err);
      }
      let img = [];
      files.forEach((element) => {
        if (
          [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"].includes(
            path.extname(element)
          )
        ) {
          img.push(element);
        }
      });
      console.log(img);
      res.render("imggallery", { list: img, base: resPath });
    });
  } else {
    res.status(500).render("error", { err: `${resPath} is a file` });
  }
};
