const pool = require("../Db.cofig.js");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error } = require("console");
const handleError = require("../Utilities/ErrorHandler.js");
const logToFile = require("../Utilities/logHandler.js");
const JWT_SECRET = process.env.JWT_SECRET;
const submitResume = async (body) => {
  let { txtsFormData, newFileName, uniqueId } = body;
  try {
    let {
      Profession,
      FullName,
      Email,
      Phone,
      describeYourself,
      Address,
      Linkedin,
      Portifolio,
      githubURL,
      Education,
      Experiences,
      skillsList,
      Certificates,
      Languages,
      Achievements,
    } = JSON.parse(txtsFormData);
    Certificates = JSON.stringify(Certificates);
    Achievements = JSON.stringify(Achievements);
    skillsList = JSON.stringify(skillsList);
    Languages = JSON.stringify(Languages);
    Education = JSON.stringify(Education);
    Experiences = JSON.stringify(Experiences);
    const sqlToInsertResume = `INSERT INTO resumesInfo (uniqueId,FullName, Email, Phone, 
      profileImages,Address, Linkedin, Portifolio, githubURL, Education, Experiences, skillsList, Certificates, Languages,Achievements,Profession,describeYourself)
VALUES ('${uniqueId}','${FullName}','${Email}','${Phone}','${newFileName}','${Address}','${Linkedin}','${Portifolio}','${githubURL}','${Education}','${Experiences}','${skillsList}','${Certificates}','${Languages}','${Achievements}','${Profession}','${describeYourself}')`;
    let [Results] = await pool.query(sqlToInsertResume);
    return { Message: "Success", Datas: Results };
  } catch (error) {
    return { Message: "Error", Error: "unable to insert data " };
  }
};
const getResume = async (uniqueId) => {
  try {
    let [results] = await pool.query(
      "SELECT * FROM resumesInfo WHERE uniqueId = ?",
      [uniqueId]
    );
    return { Message: "Success", Datas: results }; //results;
  } catch (error) {
    return { Message: "Error", Error: "unable to get data " };
  }
};
function removeFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error removing file:", err);
      return;
    }
    console.log("File removed successfully:", filePath);
  });
}
const updateResume = async (body) => {
  // console.log("body", body);
  try {
    let { newFileName, txtsFormData, resumePreviousData } = body;

    let {
      Profession,
      FullName,
      Email,
      Phone,
      describeYourself,
      Address,
      Linkedin,
      Portifolio,
      githubURL,
      Education,
      Experiences,
      skillsList,
      Certificates,
      Languages,
      Achievements,
    } = JSON.parse(txtsFormData);
    console.log("skills", skillsList);
    Certificates = JSON.stringify(Certificates);
    Achievements = JSON.stringify(Achievements);
    skillsList = JSON.stringify(skillsList);
    Languages = JSON.stringify(Languages);
    Education = JSON.stringify(Education);
    Experiences = JSON.stringify(Experiences);
    let { infoId, profileImages } = JSON.parse(resumePreviousData);
    // console.log("resumePreviousData", resumePreviousData);
    // return;
    if (newFileName !== "noFile") {
      removeFile("uploads/" + profileImages);
      let updateSql = `UPDATE resumesInfo SET  profileImages=? WHERE infoId=?`;
      let values = [newFileName, infoId];
      let [results] = await pool.query(updateSql, values);
      console.log("results", results);
    }
    let updateSql =
      "UPDATE resumesInfo SET  FullName=?,Email=?,Phone=?,Address=?,Linkedin=?,Portifolio=?,githubURL=?,Education=?,Experiences=?,skillsList=?,Certificates=?,Languages=?,Achievements=?,Profession=?,describeYourself =?WHERE infoId=?";
    values = [
      FullName,
      Email,
      Phone,
      Address,
      Linkedin,
      Portifolio,
      githubURL,
      Education,
      Experiences,
      skillsList,
      Certificates,
      Languages,
      Achievements,
      Profession,
      describeYourself,
      infoId,
    ];
    let [results] = await pool.query(updateSql, values);
    console.log("results", results);
    return { Message: "Success" }; // results;
  } catch (error) {
    console.log(error);
    return { Message: "Error" };
  }
};

const deleteResume = async (infoId) => {
  try {
    let sql = `DELETE FROM resumesInfo WHERE infoId = ?`;
    let [results] = await pool.query(sql, [infoId]);
    return "success";
  } catch (error) {
    return "error";
  }
};
// login, register;
const login = async (body) => {
  try {
    let { Email, Password } = body;
    // return hashedPassword;
    let sql = `SELECT * FROM resumesUser WHERE Email = ? limit 1`;
    let [results] = await pool.query(sql, [Email]);
    if (results.length == 0)
      return { Message: "Error", Error: "Email not found" };
    let { uniqueId } = results[0];
    console.log("results", results);
    console.log("uniqueId", uniqueId);
    let sqlToVerifyPassword = `SELECT * FROM resumesUserCredentials WHERE uniqueId=?`;
    let [hashedPassword] = await pool.query(sqlToVerifyPassword, [uniqueId]);
    console.log("hashedPassword", hashedPassword);
    let verify = bcrypt.compareSync(Password, hashedPassword[0].password);
    console.log("first verify", verify);
    if (verify) {
      const token = jwt.sign({ Email, uniqueId }, JWT_SECRET);
      return { Message: "Success", token };
    }
    return { Message: "Error", Error: "unable to login" };
  } catch (error) {
    const handledError = handleError(error).message;
    console.log("error on login ==========> " + handledError);
    // logToFile(" error on login ==========> " + handledError);
    return { Message: "Error", Error: "unable to login" };
  }
};
const registerUser = async ({ Email, Password }) => {
  try {
    if (!Email || !Password) {
      return { message: "Error", error: "Email and password are required" };
    }
    const uniqueId = uuidv4();
    const hashedPassword = await bcrypt.hash(Password, 10);

    const existingUserQuery = `SELECT * FROM resumesUser join resumesUserCredentials on
   resumesUser.uniqueId = resumesUserCredentials.uniqueId WHERE email = ?`;

    const [existingUserResult] = await pool.query(existingUserQuery, [Email]);

    if (existingUserResult.length > 0) {
      const existingUser = existingUserResult[0];
      const existingPassword = existingUser.password;
      const passwordMatch = await bcrypt.compare(Password, existingPassword);

      if (!passwordMatch) {
        return {
          message: "Error",
          error: "Email already exists with different password",
        };
      }
      // create token to user
      const token = jwt.sign({ Email, uniqueId }, JWT_SECRET);
      return {
        token,
        message: "Success",
        detail: "User already exists with current password and email",
      };
    }

    const insertUserQuery = `INSERT INTO resumesUser (uniqueId, email) VALUES (?, ?)`;
    const [insertUserResult] = await pool.query(insertUserQuery, [
      uniqueId,
      Email,
    ]);

    if (insertUserResult.affectedRows <= 0) {
      return { message: "Error", error: "Unable to register user" };
    }

    const insertCredentialsQuery = `INSERT INTO resumesUserCredentials (uniqueId, password) VALUES (?, ?)`;
    const [insertCredentialsResult] = await pool.query(insertCredentialsQuery, [
      uniqueId,
      hashedPassword,
    ]);

    if (!insertCredentialsResult || insertCredentialsResult.affectedRows <= 0) {
      return { message: "Error", error: "Unable to register user" };
    }

    const token = jwt.sign({ Email, uniqueId }, process.env.JWT_SECRET);

    return {
      message: "Success",
      token,
      messageDetail: "User registered successfully",
    };
  } catch (error) {
    // console.log("error in register users ", error);
    const handledError = handleError(error);
    console.log(`  error on login " ${handledError}`);
    return { message: "Error", error: "Unable to register user" };
  }
};
let reqestPasswordForget = async (query) => {
  console.log("in reqestPasswordForget query == ", query);
  try {
    let { Email } = query;
    let selectQuery = `SELECT * FROM resumesUser WHERE Email = ?`;
    let [results] = await pool.query(selectQuery, [Email]);
    let { uniqueId } = results[0];
    let sixDigit = Math.floor(1000000 * Math.random());
    let sql = `UPDATE resumesUserCredentials SET pinCode = ? WHERE uniqueId = ?`;
    let [updateResults] = await pool.query(sql, [sixDigit, uniqueId]);
    if (updateResults.affectedRows <= 0)
      return { Message: "Error", error: "unable to update pincode" };
    const token = jwt.sign({ Email, uniqueId }, process.env.JWT_SECRET);

    return {
      Message: "Success",
      token,
      uniqueId: results[0].uniqueId,
    };
  } catch (error) {
    console.log("error", error);
    return { Message: "Error" };
  }
};
let verifyPincode = async (body) => {
  console.log("body", body);
  try {
    let { pinCode, uniqueId } = body;
    let selectQuery = `SELECT * FROM resumesUserCredentials WHERE uniqueId = ?`;
    let [results] = await pool.query(selectQuery, [uniqueId]);
    console.log("results", results);
    if (results[0].pinCode == pinCode) {
      const token = jwt.sign({ Email: results[0].Email, uniqueId }, JWT_SECRET);
      return {
        Message: "Success",
        token,
        messageDetail: "Pincode verified successfully",
      };
    } else {
      return { Message: "Error", Error: "Wrong Pincode" };
    }
  } catch (error) {
    console.log("error", error);
    return { Message: "Error", Error: "unable to verify pincode" };
  }
};
let updatePassword = async (query) => {
  try {
    let { uniqueId, password } = query;
    let sql = `UPDATE resumesUserCredentials SET password = ? WHERE uniqueId = ?`;
    let [results] = await pool.query(sql, [password, uniqueId]);
    return { Message: "Success" };
  } catch (error) {
    console.log("error", error);
    return { Message: "Error", Error: "unable to update password" };
  }
};
//  updatePassword,
module.exports = {
  updatePassword,
  verifyPincode,
  reqestPasswordForget,
  submitResume,
  getResume,
  updateResume,
  deleteResume,
  login,
  registerUser,
};
