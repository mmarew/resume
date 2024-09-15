const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
