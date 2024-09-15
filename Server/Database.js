const pool = require("./Db.cofig");

let resumeUsers = `CREATE TABLE IF NOT EXISTS resumesUser (
  userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  uniqueId varchar(90) NOT NULL,
  Email VARCHAR(900) NOT NULL,
  Status ENUM ('active', 'inactive') DEFAULT 'active')`;

let usersCredentialsTable = `CREATE TABLE IF NOT EXISTS resumesUserCredentials (
  credentialId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  uniqueId varchar(90) NOT NULL,
  password VARCHAR(900) NOT NULL,
  pinCode VARCHAR(6) NOT NULL)`;

let createResumeTable = `CREATE TABLE IF NOT EXISTS resumesInfo (
  infoId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  uniqueId varchar(90) NOT NULL,
  FullName VARCHAR(60),
  Email VARCHAR(900),
  Phone VARCHAR(20),
  Profession VARCHAR(900),
  describeYourself VARCHAR(900),
  Address VARCHAR(900),
  profileImages VARCHAR(900),
  Linkedin VARCHAR(900),
  Portifolio VARCHAR(900),
  githubURL VARCHAR(900),
  Education VARCHAR(900),
  Experiences VARCHAR(900),
  skillsList VARCHAR(900),
  Certificates VARCHAR(900),
  Languages VARCHAR(900),
  Achievements VARCHAR(900))`;

const createTable = async () => {
  try {
    await pool.query(resumeUsers);
    await pool.query(usersCredentialsTable);
    await pool.query(createResumeTable);
    // console.log("Tables created successfully");
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = { createTable };
