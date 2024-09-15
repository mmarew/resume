import { Chip, Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useState } from "react";
import { ResumeContext } from "../ResumeContext/ResumeContext";
import TitleInfo from "../../Utilities/TitleInfo";

function PersonalInfos() {
  let {
    SelectedFiles,
    setSelectedFiles,
    setTextFormData,
    txtsFormData,
    profileImage,
    setProfileImage,
  } = useContext(ResumeContext);
  const [Skills, setSkills] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextFormData({
      ...txtsFormData,
      [name]: value,
    });
  };

  const handleSkills = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setTextFormData(() => {
      return {
        ...txtsFormData,
        skillsList: [...txtsFormData.skillsList, Skills],
      };
    });
    setSkills("");
  };
  // Meklit369*
  // 09
  const [usersLanguage, setusersLanguage] = useState("");
  // usersLanguage;
  const handleLanguages = (e) => {
    e.preventDefault();
    setTextFormData({
      ...txtsFormData,
      Languages: [...txtsFormData.Languages, usersLanguage],
    });
    setusersLanguage("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedFiles(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <section>
        <TitleInfo Title="Your Account Profile" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="text"
              required
              label="Full Name"
              name="FullName"
              value={txtsFormData.FullName}
              onChange={handleChange}
            />{" "}
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="email"
              required
              label="Email"
              name="Email"
              value={txtsFormData.Email}
              onChange={handleChange}
            />{" "}
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="tel"
              label="Phone"
              name="Phone"
              value={txtsFormData.Phone}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
      </section>
      <section>
        <TitleInfo Title="Prophile Photo" />
        <Grid container>
          <Grid item xs={12} md={4} sx={{ marginTop: "10px" }}>
            <TextField
              sx={{ width: "90%" }}
              name="profileImage"
              id="profileImage"
              type="file"
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ marginTop: "10px" }}>
            {SelectedFiles && (
              <img
                src={SelectedFiles}
                alt="Selected"
                style={{ maxWidth: "200px", maxHeight: "100px" }}
              />
            )}
          </Grid>
        </Grid>
      </section>
      <section>
        <TitleInfo Title="Your CV Profile" />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sx={{ marginTop: "10px" }}>
            <TextField
              label="Your Profession"
              value={txtsFormData.Profession}
              name="Profession"
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ marginTop: "10px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                type="text"
                label="Address"
                name="Address"
                value={txtsFormData.Address}
                onChange={handleChange}
                required
              />
              <p>Hint: Ethiopia, Addis Abeba Bolie subcity woreda 10</p>
            </div>
          </Grid>
        </Grid>
      </section>
      <section>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "150px",
          }}
        >
          <TextField
            multiline
            label="Describe yourself"
            value={txtsFormData.describeYourself}
            name="describeYourself"
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div
          onClick={() => {
            document.getElementById("skillsInput").focus();
          }}
          className="skillsWrapper"
        >
          <label>Write your skills here </label>
          <span className="listOfSkills">
            {txtsFormData?.skillsList?.map((skill, indexToRemove) => (
              <span key={indexToRemove}>
                {/* Make sure to set contentEditable to false for each span */}
                <Chip
                  label={skill}
                  onDelete={() =>
                    setTextFormData({
                      ...txtsFormData,
                      skillsList: txtsFormData.skillsList.filter(
                        (_, index) => index !== indexToRemove
                      ),
                    })
                  }
                  deleteIcon={
                    <CloseIcon color="error" sx={{ color: "red !important" }} />
                  }
                  style={{ margin: "5px" }}
                />
              </span>
            ))}
            <form onSubmit={handleSkills}>
              <input
                id="skillsInput"
                value={Skills}
                onInput={(e) => {
                  setSkills(e.target.value);
                }}
              />
            </form>
          </span>
        </div>
        <br />
        <Grid container spacing={2} className="personalInfo">
          <Grid item xs={12} md={4} sx={{ marginTop: "10px" }}>
            <TextField
              fullWidth
              type="url"
              label="LinkedIn Profile URL"
              name="Linkedin"
              value={txtsFormData.Linkedin}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ marginTop: "10px" }}>
            <TextField
              fullWidth
              type="url"
              label="github Profile URL"
              name="githubURL"
              value={txtsFormData.githubURL}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ marginTop: "10px" }}>
            <TextField
              fullWidth
              type="url"
              label="Portifolio URL"
              name="Portifolio"
              value={txtsFormData.Portifolio}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </section>
      <section>
        <TitleInfo Title="Languages" />

        <div
          className="listOfLanguages"
          onClick={() => {
            document.getElementById("languagesInput").focus();
          }}
        >
          {txtsFormData?.Languages?.length > 0 &&
            txtsFormData?.Languages?.map((language, indexToRemove) => (
              <p key={indexToRemove}>
                <Chip
                  deleteIcon={
                    // <IconButton>
                    <CloseIcon color="error" sx={{ color: "red !important" }} />
                    // </IconButton>
                  }
                  style={{ margin: "5px " }}
                  label={language}
                  onDelete={() =>
                    setTextFormData({
                      ...txtsFormData,
                      Languages: txtsFormData?.Languages.filter(
                        (_, index) => index !== indexToRemove
                      ),
                    })
                  }
                />
              </p>
            ))}
          <form onSubmit={handleLanguages}>
            <input
              id="languagesInput"
              className="languagesInput"
              type="text"
              name="languages"
              value={usersLanguage}
              onChange={(e) => setusersLanguage(e.target.value)}
              required
            />
          </form>
        </div>
      </section>
      {/* list of skills */}
    </div>
  );
}

export default PersonalInfos;
