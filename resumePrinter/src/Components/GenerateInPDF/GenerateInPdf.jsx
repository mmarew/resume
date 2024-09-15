import "./GenerateInPdf.css";
import QRCodeGenerator from "../QRGenerator/QRCodeGenerator";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Button,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../ResumeContext/ResumeContext";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import TitleInfo from "../../Utilities/TitleInfo";
import html2pdf from "html2pdf.js";
const GeneratePDF = ({ setTabValue }) => {
  let { txtsFormData, SelectedFiles, setSelectedFiles } =
    useContext(ResumeContext);
  let printInPdf = () => {
    const element = document.getElementById("pdfTableContainer");
    html2pdf().from(element).save();
  };
  useEffect(() => {
    const imageUrl = SelectedFiles;
    if (!SelectedFiles?.startsWith("http")) return;
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setSelectedFiles(base64String);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {});
  }, []);
  const [QRURL, setQRURL] = useState("");
  useEffect(() => {
    if (
      txtsFormData.Portifolio ||
      txtsFormData.githubURL ||
      txtsFormData.Linkedin
    )
      setQRURL(
        txtsFormData.Portifolio ||
          txtsFormData.githubURL ||
          txtsFormData.Linkedin
      );
  }, [
    txtsFormData.Portifolio || txtsFormData.githubURL || txtsFormData.Linkedin,
  ]);

  return (
    <>
      <main id="pdfTableContainer">
        <div className="headerWrapper">
          <div className="profileImgWrapper">
            {/* const imgSrc = `data:image/jpeg;base64,${imgBase64}`; */}
            <img style={{ width: "110px" }} src={SelectedFiles} />
          </div>
          <div className="descriptionWrapper">
            <div className="usersFllName">{txtsFormData.FullName}</div>
            <div
              style={{ fontWeight: "bold", padding: "10px" }}
              className="professionTitle"
            >
              {txtsFormData.Profession}
            </div>
            <hr />
            <div className="professionDescription">
              {txtsFormData.describeYourself}
            </div>
          </div>
          <div className="qrWrapper">
            {QRURL && (
              <QRCodeGenerator
                url={
                  txtsFormData.Portifolio ||
                  txtsFormData.githubURL ||
                  txtsFormData.Linkedin
                }
              />
            )}
          </div>
        </div>
        <hr />
        <div className="addressWrapper">
          <Grid container spacing={2}>
            <Grid display={"flex"} alignItems={"center"} item xs={12} md={4}>
              <a href={"mailto:" + txtsFormData.Email}>
                {" "}
                <MailOutlineIcon />
                <span>My Email</span>
              </a>
            </Grid>
            <Grid display={"flex"} alignItems={"center"} item xs={12} md={4}>
              <a href={"tel:" + txtsFormData.Phone}>
                {" "}
                <PhoneIcon /> <span>{txtsFormData.Phone}</span>
              </a>
            </Grid>
            <Grid display={"flex"} alignItems={"center"} item xs={12} md={4}>
              <LocationOnIcon />
              <span>{txtsFormData.Address}</span>
            </Grid>
            <Grid display={"flex"} alignItems={"center"} item xs={12} md={4}>
              <a href={txtsFormData.Linkedin}>
                {" "}
                <a href={txtsFormData.Linkedin}>
                  <LinkedInIcon />
                  <span>My Linkedin</span>
                </a>
              </a>
            </Grid>
            <Grid display={"flex"} alignItems={"center"} item xs={12} md={4}>
              <a href={txtsFormData.Portifolio}>
                {" "}
                <LanguageIcon />
                <span>My Portifollio</span>
              </a>
            </Grid>
            <Grid display={"flex"} alignItems={"center"} item xs={12} md={4}>
              <a href={txtsFormData.githubURL}>
                {" "}
                <GitHubIcon />
                <span>My GitHub</span>
              </a>
            </Grid>
          </Grid>
        </div>

        {/* skill  wrapper  */}
        <div className="skillWrapper">
          <TitleInfo Title={"Skills"} />
          <ul>
            {txtsFormData.skillsList.map((Skill, index) => {
              return (
                <Chip
                  sx={{ margin: "10px" }}
                  key={"Skills_" + index}
                  label={Skill}
                />
              );
            })}
          </ul>
        </div>
        {/* Work Experience */}
        <div className="workExperiances">
          <TitleInfo Title={"Experiances"} />
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="tableHeader">
                <TableRow>
                  <TableCell>Position</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>From Year To Year</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Web Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {txtsFormData.Experiences.map((exp, index) => (
                  <TableRow key={index}>
                    <TableCell>{exp.jobPosition}</TableCell>
                    <TableCell>{exp.Organization}</TableCell>
                    <TableCell>
                      {exp.fromDate + " "} to {" " + exp.toDate}
                    </TableCell>
                    <TableCell>{exp.address}</TableCell>
                    <TableCell>
                      <a href="www.evangadi.com">{exp.webUrl}</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* Education wrapper */}
        <div className="EducationWrapper">
          <TitleInfo Title={"Education"} />

          <TableContainer component={Paper}>
            <Table>
              <TableHead className="tableHeader">
                <TableRow>
                  <TableCell>Program</TableCell>
                  <TableCell>School</TableCell>
                  <TableCell>From Year To Year</TableCell>
                  <TableCell>School Address</TableCell>
                  <TableCell>Web Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {txtsFormData?.Education?.map((edu, index) => (
                  <TableRow key={index}>
                    <TableCell>{edu.educationName}</TableCell>
                    <TableCell>{edu.educationOrganizationName}</TableCell>
                    <TableCell>
                      {edu.educationFromDate + " "} to{" "}
                      {" " + edu.educationToDate}
                    </TableCell>
                    <TableCell>{edu.educationAddress}</TableCell>
                    <TableCell>
                      <a href={edu.educationWebsite}>{edu.educationWebsite}</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="languageWrapper">
          <TitleInfo Title={"Languages"} />

          <ul>
            {txtsFormData?.Languages?.map((Language) => {
              return (
                <li>
                  <Chip label={Language} sx={{ margin: "10px 0" }} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="achievementsWrapper">
          <TitleInfo Title={"Achivements"} />

          <TableContainer component={Paper}>
            <Table>
              <TableHead className="tableHeader">
                <TableRow>
                  <TableCell>Achievement Name</TableCell>
                  <TableCell>Achievement Details</TableCell>
                  <TableCell>Achievement Date</TableCell>
                  <TableCell>Web Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {txtsFormData?.Achievements?.map((achievement, index) => (
                  <TableRow key={index}>
                    <TableCell>{achievement.achivementName}</TableCell>
                    <TableCell>{achievement.achivementDetails}</TableCell>
                    <TableCell>{achievement.achivementDate}</TableCell>
                    <TableCell>
                      <a href={achievement.achivementWebsite}>
                        {achievement.achivementWebsite}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
      <Button
        variant="contained"
        style={{ display: "block", margin: "0 auto" }}
        onClick={printInPdf}
      >
        Print In Pdf
      </Button>
    </>
  );
};
export default GeneratePDF;
