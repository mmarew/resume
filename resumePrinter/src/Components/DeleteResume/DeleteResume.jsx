import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

function DeleteResume({ data }) {
  let VITE_API_SERVER_PATH = import.meta.env.VITE_API_SERVER_PATH;
  let { deleteUsersResume, setDeleteUsersResume, fetchResume } = data;
  let handleClose = () => {
    setDeleteUsersResume((prevState) => ({
      ...prevState,
      Open: false,
    }));
  };
  let deleteUsersData = async () => {
    handleClose();
    let { userData } = deleteUsersResume;
    let { infoId } = userData;
    let Responces = await axios.delete(
      `${VITE_API_SERVER_PATH}/deleteResume/${infoId}`
    );
    fetchResume();
  };

  return (
    <div>
      <Modal open={deleteUsersResume.Open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 2,
          }}
        >
          <Typography>Are you sure you want to delete this data?</Typography>
          <Box>
            <Button onClick={deleteUsersData}>Yes</Button>
            <Button onClick={() => handleClose()}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteResume;
