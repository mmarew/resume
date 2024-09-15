import React, { useContext, useEffect, useState } from "react";
import { CurrendDate } from "../../Utilities/DateForMatter";
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
import { ResumeContext } from "../ResumeContext/ResumeContext";
const achivementsData = {
  achivementName: "",
  achivementDetails: "",
  achivementDate: CurrendDate(),
  achivementWebsite: "",
};
function Achivements() {
  let { txtsFormData, setTextFormData } = useContext(ResumeContext);
  const [AchiveMentFormData, setAchiveMentFormData] = useState(achivementsData);
  const [addNewAchivements, setAddNewAchivements] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  useEffect(() => {
    let {
      achivementName,
      achivementDetails,
      achivementDate,
      achivementWebsite,
    } = AchiveMentFormData;
    if (
      !achivementName ||
      !achivementDetails ||
      !achivementDate ||
      !achivementWebsite
    ) {
      return setShowAddButton(false);
    }
    setShowAddButton(true);
  }, [AchiveMentFormData]);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setAchiveMentFormData({
      ...AchiveMentFormData,
      [name]: value,
    });
  };
  return (
    <div>
      {txtsFormData?.Achievements.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Achivements Name</TableCell>
                <TableCell>Achivements Detail</TableCell>
                <TableCell>Achivements Date</TableCell>
                <TableCell>Achivements Website</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {txtsFormData?.Achievements?.map((achivements, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{achivements.achivementName}</TableCell>
                    <TableCell>{achivements.achivementDetails}</TableCell>
                    <TableCell>{achivements.achivementDate}</TableCell>
                    <TableCell>{achivements.achivementWebsite}</TableCell>
                    <TableCell>
                      <Button
                        sx={{ color: "red" }}
                        onClick={() => {
                          setTextFormData({
                            ...txtsFormData,
                            Achivements: [
                              ...txtsFormData.Achivements.slice(0, index),
                              ...txtsFormData.Achivements.slice(index + 1),
                            ],
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
        <h3 style={{ color: "red" }}>No Achivements Informations</h3>
      )}
      {!addNewAchivements && (
        <Button variant="contained" onClick={() => setAddNewAchivements(true)}>
          Add Achivements
        </Button>
      )}
      <Modal open={addNewAchivements}>
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
              flexDirection: "column",
              maxWidth: "380px",
              padding: "30px",
              backgroundColor: "white",
            }}
          >
            <TextField
              onChange={handleInputsChange}
              label="Achivements Name"
              name="achivementName"
              value={AchiveMentFormData.achivementName}
            />
            <TextField
              onChange={handleInputsChange}
              label="Achivements Details"
              name="achivementDetails"
              value={AchiveMentFormData.achivementDetails}
            />
            <TextField
              type="date"
              onChange={handleInputsChange}
              label="Achivements Date"
              name="achivementDate"
              value={AchiveMentFormData.achivementDate}
            />
            <TextField
              type="url"
              onChange={handleInputsChange}
              label="Achivements Website"
              name="achivementWebsite"
              value={AchiveMentFormData.achivementWebsite}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              {showAddButton ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    setTextFormData({
                      ...txtsFormData,
                      Achievements: [
                        ...txtsFormData.Achievements,
                        AchiveMentFormData,
                      ],
                    });
                    setAddNewAchivements(false);
                    setAchiveMentFormData(achivementsData);
                  }}
                >
                  Add
                </Button>
              ) : (
                <Button disabled>Add</Button>
              )}
              <Button
                onClick={() => setAddNewAchivements(false)}
                variant="contained"
                color="warning"
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

export default Achivements;
