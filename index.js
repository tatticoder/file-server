const express = require("express");
const app = express();
const fs = require("fs");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//disable express headers
app.disable("x-powered-by");
//replace with path of folder you want to read
const directoryPath = "./";
app.get("/", function (req, res) {
  //for subfolders in this folder
  let requestedPath = directoryPath + (req.query.name || "");
  console.log("going ot scan :" + requestedPath);
  fs.readdir(requestedPath, function (err, files) {
    //handling error
    if (err) {
      res.render("error", { err: JSON.stringify(err) });
      return console.error("Unable to scan directory: " + err);
    }
    res.render("index", { list: files, base: requestedPath });
  });
});
app.get("/play", (req, res) => {
  const resPath = req.query.path + req.query.name;
  if (fs.lstatSync(resPath).isDirectory()) {
    console.log("User requested directory :" + resPath);
    res.redirect(`/?name=${req.query.name}`);
  } else {
    //currently only for videos, more formats will be supported in future
    console.log("User requested file :" + resPath);
    res.render("play", { file: resPath });
  }
});
app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const videoPath = req.query.name;
  console.log("playing :" + videoPath);
  try {
    const videoSize = fs.statSync(videoPath).size;
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
