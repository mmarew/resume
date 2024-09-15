const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const routes = require("./Routes/index.routes");
const multer = require("multer");
const { createTable } = require("./Database");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
require("./Utilities/logHandler");
console.log("write my message ");
createTable();
app.listen(port, (err) => {
  if (err) return console.log(`  error ${err}`);
  // console.log(`Server is running on port ${port}`);
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // File name will be current timestamp + original file name
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Route to handle file upload

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));
// app.use(express.static(path.join(__dirname, "uploads")));
