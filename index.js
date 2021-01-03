const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//disable express headers for enhanced security
app.disable("x-powered-by");
// use port from .env or fall back to 8000
const port = process.env.PORT || 8000;

// list all files in this directory
app.get("/", require("./routes/list").listDir);

// identify what to do with file selected by user
app.get("/show", require("./routes/identify").send);

// user wnats to download this file
app.get("/download", require("./routes/download").download);

// user wants to play this video
app.get("/video", require("./routes/video").playvid);

app.get("/img", require("./routes/imggallery").showGal);

// user is lost
app.use((req, res, next) => {
  res.status(404).render("error", { err: req.url + " not found" });
});
app.listen(port, () => console.log(`Listening on port ${port}!!!`));
