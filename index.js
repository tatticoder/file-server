const express = require("express");
const app = express();
const fs = require("fs");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//disable express headers
app.disable("x-powered-by");
//replace with path of folder you want to read
const directoryPath = "/media/stardust/songs/epicfiles/porn/";
app.get("/", function (req, res) {
  //passsing directoryPath and callback function
  if (req.query.name) {
    console.log("PLease scan :" + req.query.name);
    //for subfolders in this folder
    var directoryPath2 = directoryPath + req.query.name;
  } else {
    var directoryPath2 = directoryPath;
  }
  fs.readdir(directoryPath2, function (err, files) {
    //handling error
    if (err) {
      res.render("error", { err: JSON.stringify(err) });
      return console.log("Unable to scan directory: " + err);
    }
    res.render("index", { list: files });
  });
});
app.get("/play", (req, res) => {
  console.log("Name of file is " + req.query.name);

  if (fs.lstatSync(directoryPath + req.query.name).isDirectory()) {
    console.log("it is a directory :" + req.query.name);
    res.redirect(`/?name=${req.query.name}`);
  } else {
    //currently only for videos, more formats will be supported in future
    console.log("it is a directory :" + req.query.name);
    res.render("play", { file: req.query.name });
  }
});
app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const videoPath = directoryPath + req.query.name;
  const videoSize = fs.statSync(videoPath).size;
  try {
    // Parse Range
    // 1MB or 1% of video whicever is larger
    const CHUNK_SIZE =
      10 ** 6 > videoSize / 100 ? 10 ** 6 : Math.floor(videoSize / 100);
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1); // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
  } catch (error) {
    console.error("error is " + error);
    res.status(400).render("error", error);
  }
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
