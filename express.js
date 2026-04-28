const express = require("express");
const fs = require("fs");

const app = express();

// allow JSON (base64 is text)
app.use(express.json({ limit: "5mb" }));

app.post("/upload", (req, res) => {
  const image = req.body.image;

  // remove prefix
  const base64 = image.split(";base64,").pop();

  // save image
  fs.writeFile("image.png", base64, { encoding: "base64" }, (err) => {
    if (err) {
      res.send("Error saving image");
    } else {
      res.send("Image uploaded successfully");
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
