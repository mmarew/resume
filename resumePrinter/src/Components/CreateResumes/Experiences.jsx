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
let ExperiencesData = {
  jobPosition: "",
  Organization: "",
  fromDate: "",
  toDate: "",
  address: "",
  webUrl: "",
};
function Experiences() {
  const [ExperiancesFormData, setExperiancesFormData] =
    useState(ExperiencesData);
  const [ShowAddButton, setShowAddButton] = useState(false);
  useEffect(() => {
    let { jobPosition, Organization, fromDate, toDate, address } =
      ExperiancesFormData;
    if (!jobPosition || !Organization || !fromDate || !toDate || !address) {
      return setShowAddButton(false);
    }
    setShowAddButton(true);
  }, [ExperiancesFormData]);

  let { setTextFormData, txtsFormData } = useContext(ResumeContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperiancesFormData({
      ...ExperiancesFormData,
      [name]: value,
    });
  };
  const [addNewExperiances, setAddNewExperiances] = useState(false);
  const [updateExperiances, setUpdateExperiances] = useState(false);
  return (
    <div>
      {txtsFormData.Experiences.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job Position</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>From Date To Date</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Web Url</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {txtsFormData.Experiences.map((exp, index) => {
                return (
                  <TableRow key={"experiances_" + index}>
                    <TableCell>{exp.jobPosition}</TableCell>
                    <TableCell>{exp.Organization}</TableCell>
                    <TableCell>
                      {exp.fromDate} To {exp.toDate}
                    </TableCell>
                    <TableCell>{exp.address}</TableCell>
                    <TableCell>
                      <a target="_blank" href={exp.webUrl}>
                        Click Here
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setExperiancesFormData(exp);
                          setAddNewExperiances(true);
                          setUpdateExperiances(index);
                        }}
                      >
                        Edit
                      </Button>{" "}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setTextFormData({
                            ...txtsFormData,
                            Experiences: txtsFormData.Experiences.filter(
                              (exp, i) => i !== index
                            ),
                          });
                        }}
                        color="error"
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
        <h3 style={{ color: "red" }}>No Experiances Data Found</h3>
      )}
      {!addNewExperiances && (
        <Button variant="contained" onClick={() => setAddNewExperiances(true)}>
          Add New Experiance{" "}
        </Button>
      )}
      <Modal open={addNewExperiances}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "white",
            padding: "20px",
            width: "80%",
            maxWidth: "400px",
          }}
        >
          <div
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <label>Job Position </label>
              <TextField
                type="text"
                name="jobPosition"
                value={ExperiancesFormData.jobPosition}
                onChange={handleChange}
                required
              />
            </div>
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <label> Organization</label>
              <TextField
                name="Organization"
                value={ExperiancesFormData.Organization}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <label> From Date</label>
              <TextField
                fullWidth
                onChange={handleChange}
                value={ExperiancesFormData.fromDate}
                type="date"
                name="fromDate"
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <label> To Date</label>
              <TextField
                fullWidth
                onChange={handleChange}
                value={ExperiancesFormData.toDate}
                type="date"
                name="toDate"
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <label>Address</label>
              <TextField
                fullWidth
                value={ExperiancesFormData.address}
                name="address"
                onChange={handleChange}
              />
              <span>ie Addis Abeba, Ethiopia</span>
            </div>
            <div>
              <TextField
                onChange={handleChange}
                fullWidth
                label="Web Url"
                value={ExperiancesFormData.webUrl}
                name="webUrl"
              />
            </div>
          </div>
          <div style={{ display: "flex", margin: "10px auto" }}>
            {ShowAddButton ? (
              <>
                {!updateExperiances ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setTextFormData({
                        ...txtsFormData,
                        Experiences: [
                          ...txtsFormData.Experiences,
                          ExperiancesFormData,
                        ],
                      });
                      setTimeout(() => {
                        setExperiancesFormData(ExperiencesData);
                      }, 100);
                      setAddNewExperiances(false);
                    }}
                    sx={{ display: "block", margin: "0 auto" }}
                  >
                    Add
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      // setTextFormData({
                      //   ...txtsFormData,
                      //   Experiances: [
                      //     ...txtsFormData.Experiances,
                      //     ExperiancesFormData,
                      //   ],
                      // });
                      // setUpdateExperiances(null);
                      setTextFormData({
                        ...txtsFormData,
                        Experiences: txtsFormData.Experiences.map((exp, i) => {
                          if (i === updateExperiances) {
                            return ExperiancesFormData;
                          }
                          return exp;
                        }),
                      });
                      setUpdateExperiances(null);
                      setAddNewExperiances(false);
                    }}
                  >
                    Update
                  </Button>
                )}
              </>
            ) : (
              <Button disabled> Add</Button>
            )}
            <Button
              variant="contained"
              color="warning"
              onClick={() => setAddNewExperiances(false)}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Experiences;
//excersice
//faq
//
