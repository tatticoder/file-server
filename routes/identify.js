exports.send = (req, res) => {
  const resPath = req.query.path + req.query.name;
  if (fs.lstatSync(resPath).isDirectory()) {
    console.log("User requested directory :" + resPath);
    res.redirect(`/?name=${resPath}`);
  } else {
    //currently only for videos, more formats will be supported in future
    console.log("User requested file :", resPath);
    res.render("playvideo", { file: resPath });
  }
};
