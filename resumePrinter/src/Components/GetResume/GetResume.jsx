import React, { useContext, useEffect, useState } from "react";
import ResumeTemplate from "../CreateResumes/CreateResume";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteResume from "../DeleteResume/DeleteResume";
import GenerateInPdf from "../GenerateInPDF/GenerateInPdf";
import { ResumeContext } from "../ResumeContext/ResumeContext";
import decodeToken, { getUnqueId } from "../../Utilities/DecodeToken";
import { Navigate } from "react-router-dom";

function GetResume({ setTabValue }) {
  let VITE_API_SERVER_PATH = import.meta.env.VITE_API_SERVER_PATH;
  const uniqueId = getUnqueId();
  if (!uniqueId) Navigate("/login");
  let { setSelectedFiles, setTextFormData, setregisterOrUpdateResume } =
    useContext(ResumeContext);
  const [deleteUsersResume, setDeleteUsersResume] = useState({
    Open: false,
    userData: null,
  });
  const [singleResume, setsingleResume] = useState([]);
  const [EditResumeData, setEditResumeData] = useState(false);
  const [Errors, setErrors] = useState(null);
  const [resumeData, setResumeData] = useState([]);

  let fetchResume = async () => {
    try {
      setErrors(null);
      setResumeData([]);
      let Responces = await axios.get(
        `${VITE_API_SERVER_PATH}/getResume?uniqueId=` + uniqueId
      );
      let { Datas } = Responces.data;
      Datas.map((data, index) => {
        let {
          Education,
          Experiences,
          skillsList,
          Certificates,
          Languages,
          Achievements,
        } = data;
        Datas[index].skillsList = JSON.parse(skillsList);
        Datas[index].Certificates = JSON.parse(Certificates);
        Datas[index].Languages = JSON.parse(Languages);
        Datas[index].Experiences = JSON.parse(Experiences);
        Datas[index].Education = JSON.parse(Education);
        Datas[index].Achievements = JSON.parse(Achievements);
      });
      // education, Experiances, skillsList, certificates, languages;
      setResumeData(Datas);
    } catch (error) {
      setErrors(error.message);
    }
  };
  useEffect(() => {
    fetchResume();
  }, []);
  useEffect(() => {
    if (singleResume?.length > 0) {
      setSelectedFiles(
        `${VITE_API_SERVER_PATH}/uploads/${singleResume[0].profileImages}`
      );
    }
  }, [singleResume]);

  const [PrintInPdf, setPrintInPdf] = useState({ Open: false, data: null });
  return (
    <div id="table-container">
      {Errors && <p>{Errors}</p>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumeData?.map((data, index) => {
              return (
                <TableRow key={"usersTable_" + index}>
                  <TableCell>{data.FullName}</TableCell>
                  <TableCell>{data.Email}</TableCell>
                  <TableCell>{data.Phone}</TableCell>
                  {/* <TableCell>{data.Address}</TableCell>
                  <TableCell>
                    {data.Certificates.map((Certificate) => {
                      return <div>{Certificate.certificateName}</div>;
                    })}
                  </TableCell>
                  <TableCell>{data.Linkedin}</TableCell>
                  <TableCell>{data.Portifolio}</TableCell>
                  <TableCell>
                    {data?.skillsList?.map((Skill) => {
                      return <div>{Skill}</div>;
                    })}
                  </TableCell> */}
                  <TableCell>
                    <Button
                      onClick={() => {
                        setregisterOrUpdateResume("Update");
                        // setEditResumeData(true);
                        localStorage.setItem(
                          "resumePreviousData",
                          JSON.stringify(data)
                        );
                        setSelectedFiles(
                          `${VITE_API_SERVER_PATH}/uploads/${data.profileImages}`
                        );
                        setTextFormData(data);
                        setTabValue(0);
                        // setsingleResume([data]);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteUsersResume({ Open: true, userData: data });
                      }}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSelectedFiles(
                          `${VITE_API_SERVER_PATH}/uploads/${data.profileImages}`
                        );
                        // setSelectedFiles()
                        setTextFormData(data);
                        setTabValue(2);
                      }}
                    >
                      Generate In PDF
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {EditResumeData && (
        <Modal open={true}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: 2,
              height: "90%",
              overflow: "scroll",
            }}
          >
            <IconButton onClick={() => setEditResumeData(false)}>
              <CloseIcon />
            </IconButton>
            <ResumeTemplate singleResume={singleResume} />
          </Box>
        </Modal>
      )}
      {deleteUsersResume.Open && (
        <DeleteResume
          data={{ deleteUsersResume, setDeleteUsersResume, fetchResume }}
        />
      )}
      {PrintInPdf.Open && <GenerateInPdf />}
    </div>
  );
}

export default GetResume;
