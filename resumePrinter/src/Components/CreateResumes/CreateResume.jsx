import React, { useContext, useEffect, useState } from "react";
import "./CreateResume.css";
import { Button, Tabs, Tab } from "@mui/material";
import axios from "axios";
import resumeFormData from "../../Utilities/reumeFormData.jsx";
import PersonalInfos from "./PersonalInfos.jsx";
import { ResumeContext } from "../ResumeContext/ResumeContext.jsx";
import Experiances from "./Experiences.jsx";
import Education from "./Education.jsx";
import Certificates from "./Certificates.jsx";
import Achivements from "./Achivements.jsx";
import { getUnqueId } from "../../Utilities/DecodeToken.js";

const ResumeTemplate = ({ singleResume }) => {
  let VITE_API_SERVER_PATH = import.meta.env.VITE_API_SERVER_PATH;
  let uniqueId = getUnqueId();

  let formData = new FormData();
  let resumePreviousData = localStorage.getItem("resumePreviousData");
  let { txtsFormData, profileImage, setTextFormData, registerOrUpdateResume } =
    useContext(ResumeContext);
  useEffect(() => {
    formData.append("txtsFormData", txtsFormData);
    if (profileImage) formData.append("profileImage", profileImage);
  }, [txtsFormData, profileImage]);

  useEffect(() => {
    if (singleResume?.length > 0) {
      setTextFormData(singleResume[0]);
    }
  }, [singleResume]);

  const updateFormsData = async () => {
    formData.set("uniqueId", uniqueId);
    formData.set("profileImage", profileImage);
    formData.set("txtsFormData", JSON.stringify(txtsFormData));
    formData.set("resumePreviousData", resumePreviousData);
    try {
      const response = await axios.post(
        `${VITE_API_SERVER_PATH}/updateResume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let { Message } = response.data;
      alert(Message);
    } catch (error) {
      alert(error.message);
    }
  };

  const insertFormsData = async () => {
    formData.set("profileImage", profileImage);
    formData.set("txtsFormData", JSON.stringify(txtsFormData));
    formData.set("uniqueId", uniqueId);
    try {
      const response = await axios.post(
        `${VITE_API_SERVER_PATH}/submitResume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let { Message } = response.data;
      alert(Message);
      // Log the response from the server
      // Optionally, you can reset the form after successful submission
      // return;
      // setFormData({ ...resumeFormData });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    insertFormsData();
    // if (singleResume?.length > 0) return updateFormsData();
  };

  const [value, setValue] = useState(0);

  const handleChangeInTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section>
      <div
        // onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",

          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <Tabs value={value} onChange={handleChangeInTabs}>
          <Tab label="1 Personal Info " />
          <Tab label="2 Experiances " />
          <Tab label="3 Education " />
          <Tab label="4 Certificates " />
          <Tab label="5 Achivements " />
        </Tabs>
        {value === 0 && (
          <>
            <PersonalInfos />
            <Button onClick={() => setValue(value + 1)}>Next</Button>
          </>
        )}
        {value === 1 && (
          <>
            <Experiances />
            <div>
              <Button onClick={() => setValue(value - 1)}>Back</Button>
              <Button onClick={() => setValue(value + 1)}>Next</Button>
            </div>
          </>
        )}
        {value === 2 && (
          <>
            <Education />
            <div>
              <Button onClick={() => setValue(value - 1)}>Back</Button>
              <Button onClick={() => setValue(value + 1)}>Next</Button>
            </div>
          </>
        )}
        {value === 3 && (
          <>
            <Certificates />
            <div>
              <Button onClick={() => setValue(value - 1)}>Back</Button>
              <Button onClick={() => setValue(value + 1)}>Next</Button>
            </div>
          </>
        )}
        {value === 4 && (
          <>
            <Achivements />
            <div style={{ display: "flex", gap: "10px" }}>
              {registerOrUpdateResume == "Update" ? (
                <Button
                  type="submit"
                  onClick={updateFormsData}
                  variant="contained"
                  color="primary"
                >
                  Update Resume
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Save Resume
                </Button>
              )}
              <div>
                <Button onClick={() => setValue(value - 1)}>Back</Button>{" "}
                {/* <Button onClick={() => setValue(0)}>Next</Button> */}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ResumeTemplate;
