const Service = require("../Service/index.service.js");
let testConnection = (req, res) => {
  res.json("connected");
};
const submitResume = async (req, res) => {
  let newFileName = "noFile";
  if (req.file) newFileName = req.file.filename;
  req.body.newFileName = newFileName;
  let Responce = await Service.submitResume(req.body);
  let { Message } = Responce;
  if (Message == "Success") res.send(Responce);
  else res.status(400).send(Responce);
};
const getResume = async (req, res) => {
  let { uniqueId } = req.query;
  let Responce = await Service.getResume(uniqueId);
  res.send(Responce);
};
const updateResume = async (req, res) => {
  let newFileName = "noFile";
  if (req.file) newFileName = req.file.filename;
  req.body.newFileName = newFileName;
  let Responce = await Service.updateResume(req.body);
  let { Message } = Responce;
  if (Message == "Success") res.send(Responce);
  else res.status(400).send(Responce);
};
let deleteResume = async (req, res) => {
  let Responce = await Service.deleteResume(req.params.id);
  if (Responce == "error") res.status(400).send(Responce);
  else res.send(Responce);
};

let login = async (req, res) => {
  let Responce = await Service.login(req.body);
  let { Message } = Responce;
  if (Message == "Success") {
    return res.status(200).send(Responce);
  }

  res.status(400).send(Responce);
};
let register = async (req, res) => {
  let Responce = await Service.registerUser(req.body);
  if (Responce.Message == "Error") {
    return res.status(400).send(Responce);
  }
  res.send(Responce);
};
let reqestPasswordForget = async (req, res) => {
  let Responce = await Service.reqestPasswordForget(req.query);
  let { Message } = Responce;
  if (Message == "Error") {
    return res.status(400).send(Responce);
  }
  res.send(Responce);
};
let verifyPincode = async (req, res) => {
  let Responce = await Service.verifyPincode(req.body);
  let { Message } = Responce;
  if (Message == "Error") {
    return res.status(400).send(Responce);
  }
  res.send(Responce);
};
let updatePassword = async (req, res) => {
  let Responce = await Service.updatePassword(req.query);
  let { Message } = Responce;
  if (Message == "Error") {
    return res.status(400).send(Responce);
  }
  res.send(Responce);
};

module.exports = {
  reqestPasswordForget,
  verifyPincode,
  updatePassword,

  login,
  register,
  submitResume,
  testConnection,
  getResume,
  updateResume,
  deleteResume,
};
