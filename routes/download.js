exports.download = (req, res) => {
  try {
    console.log("User requested file :", req.query.name);
    res.sendFile(req.query.name);
  } catch (err) {
    console.error(err);
    res.render("error", { err: JSON.stringify(err) });
  }
};
