const fs = require("fs");
exports.playvid = (req, res) => {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const videoPath = req.query.name;
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
};
