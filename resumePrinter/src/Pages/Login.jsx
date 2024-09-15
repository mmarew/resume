import React, { useEffect, useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import ErrorHandler from "../Utilities/ErrorHandler";
import { Link, useNavigate } from "react-router-dom";
import { getEmailAndUniqueId } from "../Utilities/DecodeToken";
function Login() {
  const emailAndUniqueId = getEmailAndUniqueId();
  useEffect(() => {
    if (emailAndUniqueId) {
      Navigate("/");
    }
  }, [emailAndUniqueId]);

  let VITE_API_SERVER_PATH = import.meta.env.VITE_API_SERVER_PATH;
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    Email: "",
    Password: "",
  });

  const [errorData, setErrorData] = useState({
    Message: null,
    Detail: null,
  });
  useEffect(() => {
    if (errorData.Message)
      document.getElementById("errorMessages").innerHTML =
        errorData.Message + " : " + errorData.Detail;
    else document.getElementById("errorMessages").innerHTML = "";
  }, [errorData]);

  const handleInputsData = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  let Navigate = useNavigate();
  const submitLoginData = async (e) => {
    e.preventDefault();
    try {
      console.log("loginForm", loginForm);
      setIsLoading(true);
      const response = await axios.post(
        VITE_API_SERVER_PATH + "/login",
        loginForm
      );
      setIsLoading(false);

      let { Message, token } = response.data;
      if (Message == "Success") {
        localStorage.setItem("token", token);
        Navigate("/");
      }
    } catch (error) {
      console.log("error", error);
      ErrorHandler(error, setErrorData);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Paper sx={{ padding: "10px 20px", width: "300px", margin: "auto" }}>
        <h2>Login Form</h2>
        <form
          onSubmit={submitLoginData}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div style={{ color: "red" }} id="errorMessages"></div>
          {/* <br /> */}
          <TextField
            name="Email"
            onChange={handleInputsData}
            value={loginForm.Email}
            label="Email"
            type="email"
          />
          <TextField
            onChange={handleInputsData}
            name="Password"
            value={loginForm.Password}
            label="Password"
            type="password"
          />
          {isLoading ? (
            <Button>Loading ..... </Button>
          ) : (
            <Button type="submit" variant="contained">
              Login
            </Button>
          )}
          <div style={{ display: "flex" }}>
            <Link style={{ marginRight: "10px" }} to={"/register"}>
              Register here
            </Link>
            <Link to={"/forgotPassword"}>Forgot Password</Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
