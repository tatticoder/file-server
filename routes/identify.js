const fs = require("fs");
const path = require("path");
exports.send = (req, res) => {
  const resPath = req.query.path + req.query.name;
  try {
    if (fs.lstatSync(resPath).isDirectory()) {
      console.log("User requested directory :" + resPath);
      res.redirect(`/?name=${resPath}`);
    } else {
      const ext = path.extname(resPath);
      if ([".mp4", ".mkv"].includes(ext)) {
        res.render("playvideo", { file: resPath });
      } else if ([".mp3", ".flac", ".m4a"].includes(ext)) {
        res.render("playsong", { file: resPath });
      } else if (
        [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"].includes(ext)
      ) {
        res.render("showimage", { file: resPath });
      } else if (".pdf" == ext) {
        res.render("document", { file: resPath });
      } else {
        res.render("error", { err: ext + " is not supported" });
      }
    }
  } catch (error) {
    res.status(500).render("error", { err: error });
  }
};
