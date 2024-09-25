import React, { useEffect, useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import ErrorHandler from "../Utilities/ErrorHandler";
import { Link, useNavigate } from "react-router-dom";
let registersData = {
  Email: "",
  Password: "",
  ReTypePassword: "",
};
function Register() {
  const [errorData, setErrorData] = useState({
    Message: null,
    Detail: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  let SERVER_PATH = import.meta.env.VITE_API_SERVER_PATH;
  const [registrationForm, setRegistrationForm] = useState(registersData);
  let submitLoginData = async (e) => {
    e.preventDefault();
    setErrorData({ Message: null, Detail: null });
    try {
      //   debugger;
      setIsLoading(true);
      let results = await axios.post(
        SERVER_PATH + "/register",
        registrationForm
      );

      setIsLoading(false);
      setRegistrationForm(registersData);
      if (results?.data?.message.toLowerCase() === "success") {
        localStorage.setItem("token", results?.data?.token);
        Navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(error, setErrorData);
    }
  };
  const handleInpustsData = (e) => {
    const { name, value } = e.target;
    setRegistrationForm({
      ...registrationForm,
      [name]: value,
    });
  };

  useEffect(() => {
    if (errorData.Message)
      document.getElementById("errorMessages").innerHTML =
        errorData.Message + " : " + errorData.Detail;
    else document.getElementById("errorMessages").innerHTML = "";
  }, [errorData]);

  return (
    <div>
      <Paper sx={{ padding: "20px", width: "300px", margin: "auto" }}>
        <div style={{ color: "red" }} id="errorMessages"></div>
        <h4>Registeration Form To Users</h4>
        <br />
        <form
          onSubmit={submitLoginData}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <TextField
            name="Email"
            onChange={handleInpustsData}
            value={registrationForm.Email}
            label="Email"
            type="email"
          />
          <TextField
            onChange={handleInpustsData}
            name="Password"
            value={registrationForm.Password}
            label="Password"
            type="password"
          />
          <TextField
            onChange={handleInpustsData}
            name="ReTypePassword"
            value={registrationForm.ReTypePassword}
            label="Re type Password"
            type="password"
          />
          {isLoading ? (
            <>
              <progress className="progress w-56"></progress>
              <Button disabled>loading...</Button>
            </>
          ) : (
            <Button type="submit" variant="contained">
              Register
            </Button>
          )}
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={"/login"}>Login here</Link>
            <Link to={"/forgotPassword"}>Forgot Password</Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Register;
