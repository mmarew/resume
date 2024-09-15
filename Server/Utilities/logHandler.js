const fs = require("fs");
const logStream = fs.createWriteStream("./Log.txt", {
  flags: "a",
});

console.log = (message) => {
  if (message instanceof Error) {
    // If the message is an Error object, log the error's details
    logStream.write(
      new Date().toISOString() +
        " - " +
        message.name +
        ": " +
        message.message +
        "\n" +
        message.stack +
        "\n"
    );
  } else {
    // Otherwise, log the message as a regular string
    logStream.write(new Date().toISOString() + " - " + message + "\n");
  }
};

module.exports = console.log;
