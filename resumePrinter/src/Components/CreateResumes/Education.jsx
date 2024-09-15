import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../ResumeContext/ResumeContext";
import { CurrendDate } from "../../Utilities/DateForMatter";
import "./Education.css";
let educationData = {
  educationName: "",
  educationOrganizationName: "",
  educationFromDate: CurrendDate(),
  educationToDate: CurrendDate(),
  educationAddress: "",
  educationWebsite: "",
};

function Education() {
  const [educationFormData, setEducationFormData] = useState(educationData);
  const [addNewEducation, setAddNewEducation] = useState(false);
  const [ShowAddButton, setShowAddButton] = useState(false);
  let { txtsFormData, setTextFormData } = useContext(ResumeContext);
  useEffect(() => {
    let {
      educationName,
      educationOrganizationName,
      educationFromDate,
      educationToDate,
      educationAddress,
      educationWebsite,
    } = educationFormData;
    if (
      !educationName ||
      !educationOrganizationName ||
      !educationFromDate ||
      !educationToDate ||
      !educationAddress ||
      !educationWebsite
    ) {
      return setShowAddButton(false);
    }
    setShowAddButton(true);
  }, [educationFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationFormData({
      ...educationFormData,
      [name]: value,
    });
  };
  return (
    <div>
      {txtsFormData.Education.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Education Name</TableCell>
                <TableCell>School Name</TableCell>
                <TableCell>From Date</TableCell>
                <TableCell>To Date</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {txtsFormData.Education.map((edu, index) => {
                return (
                  <TableRow key={"education_" + index}>
                    <TableCell>{edu.educationName}</TableCell>
                    <TableCell>{edu.educationOrganizationName}</TableCell>
                    <TableCell>{edu.educationFromDate}</TableCell>
                    <TableCell>{edu.educationToDate}</TableCell>
                    <TableCell>{edu.educationAddress}</TableCell>
                    <TableCell>
                      <a target="_blank" href={edu.educationWebsite}>
                        {edu.educationWebsite}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => {
                          setTextFormData({
                            ...txtsFormData,
                            Education: txtsFormData.Education.filter(
                              (_, index1) => index !== index1
                            ),
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h3 style={{ color: "red" }}>No education data found</h3>
      )}
      {!addNewEducation && (
        <div>
          <br />
          <Button variant="contained" onClick={() => setAddNewEducation(true)}>
            Add Education
          </Button>
        </div>
      )}
      <Modal open={addNewEducation}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              backgroundColor: "white",
              padding: "30px",
              flexDirection: "column",
            }}
          >
            <TextField
              className="educationTextFieled"
              type="text"
              label="Program Name"
              name="educationName"
              value={educationFormData.educationName}
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Organization Name"
              name="educationOrganizationName"
              value={educationFormData.educationOrganizationName}
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Organization Address"
              name="educationAddress"
              value={educationFormData.educationAddress}
              onChange={handleChange}
            />
            <TextField
              type="date"
              label="  From date"
              name="educationFromDate"
              value={educationFormData.educationFromDate}
              onChange={handleChange}
            />
            <TextField
              type="date"
              label="To date"
              name="educationToDate"
              value={educationFormData.educationToDate}
              onChange={handleChange}
            />
            <TextField
              type="Text"
              label="Education Website"
              name="educationWebsite"
              value={educationFormData.educationWebsite}
              onChange={handleChange}
            />
            <div>
              {ShowAddButton ? (
                <Button
                  sx={{ marginRight: "10px" }}
                  variant="contained"
                  onClick={() => {
                    setTextFormData({
                      ...txtsFormData,
                      Education: [...txtsFormData.Education, educationFormData],
                    });
                    setAddNewEducation(false);
                  }}
                >
                  Add{" "}
                </Button>
              ) : (
                <Button disabled>Add</Button>
              )}
              <Button
                color="warning"
                onClick={() => setAddNewEducation(false)}
                variant="contained"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Education;
