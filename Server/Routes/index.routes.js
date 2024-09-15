const express = require("express");
const router = express.Router();
const Controller = require("../Controller/index.controller");
const { storage, upload } = require("../Utilities/FilesManager");
// Define routes
router.get("/", (req, res) => {
  res.json("connected 123");
});
router.post(
  "/updateResume",
  upload.single("profileImage"),
  Controller.updateResume
);
router.get("/getResume", Controller.getResume);
router.post(
  "/submitResume",
  upload.single("profileImage"),
  Controller.submitResume
);
router.delete("/deleteResume/:id", Controller.deleteResume);

router.post("/login", Controller.login);
router.post("/register", Controller.register);
///////////////
// reqestPasswordForget,verifyPincode,updatePassword
router.get("/reqestPasswordForget", Controller.reqestPasswordForget);
router.post("/verifyPincode", Controller.verifyPincode);
router.get("/updatePassword", Controller.updatePassword);

module.exports = router;
