import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function ForgetPassword() {
  let serverAddress = import.meta.env.VITE_API_SERVER_PATH;
  const [errorOfForgets, setErrorOfForgets] = useState(null);
  const [Email, setEmail] = useState(null);
  const [emailFound, setEmailFound] = useState(null);
  let handleSubmits = async (e) => {
    e.preventDefault();
    if (Email == null) {
      setErrorOfForgets("Please Enter Email");
      return;
    }
    try {
      let Responces = await axios.get(
        serverAddress + "/reqestPasswordForget?Email=" + Email
      );
      let { Message, token } = Responces.data;
      if (Message == "Success") setEmailFound(true);
      localStorage.setItem("token", token);
    } catch (error) {
      setErrorOfForgets(error.message);
    }
  };
  // reqestPasswordForget,verifyPincode,updatePassword
  let handleInputs = (e) => {
    setEmail(e.target.value);
  };
  const [pinCode, setpinCode] = useState(null);
  const [pinCodeVerified, setPinCodeVerified] = useState(null);
  let verifyPincode = async (e) => {
    e.preventDefault();
    try {
      let Responces = await axios.post(serverAddress + "/verifyPincode?", {
        Email: Email,
        pinCode: pinCode,
        uniqueId: localStorage.getItem("uniqueId"),
      });
      if (Responces.data.Message == "Success") setPinCodeVerified(true);
    } catch (error) {
      setErrorOfForgets(error.message);
    }
  };
  const [ConfirmPassword, setConfirmPassword] = useState(null);
  const [Password, setPassword] = useState(null);
  let handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      let Responces = await axios.get(
        serverAddress +
          "/updatePassword?Email=" +
          Email +
          "&Password=" +
          Password
      );
      if (Responces.data == "Success") {
      }
    } catch (error) {
      setErrorOfForgets(error.message);
    }
  };
  return (
    <div>
      <form
        style={{
          gap: "10px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          width: "100%",
          margin: "20px auto",
        }}
        onSubmit={handleSubmits}
      >
        {errorOfForgets}
        <TextField
          onChange={handleInputs}
          required
          name="Email"
          label="Email"
          value={Email}
        />
        <Button type="submit">Submit</Button>
      </form>
      {emailFound && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            width: "100%",
            margin: "20px auto",
            gap: "10px",
          }}
          onSubmit={verifyPincode}
        >
          <TextField
            value={pinCode}
            onChange={(e) => setpinCode(e.target.value)}
            label="Enter your new pin code "
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      )}
      {pinCodeVerified && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            width: "100%",
            margin: "20px auto",
            gap: "10px",
          }}
          onSubmit={handlePasswordSubmit}
        >
          <TextField
            label="Enter your new password"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <TextField
            required
            label="Confirm your new password"
            type="password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="">Submit</Button>
        </form>
      )}
    </div>
  );
}

export default ForgetPassword;
