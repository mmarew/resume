import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CreateResume from "../CreateResumes/CreateResume";
import GetResume from "../GetResume/GetResume";
import GeneratePDF from "../GenerateInPDF/GenerateInPdf";
import { ResumeContext } from "../ResumeContext/ResumeContext";
import { Button } from "@mui/material";

function ResumeTabs() {
  let { registerOrUpdateResume, setregisterOrUpdateResume } =
    useContext(ResumeContext);
  const [value, setTabValue] = React.useState(0);
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <div>
        <Tabs value={value} onChange={handleChange} aria-label="Tabs example">
          <Tab label={registerOrUpdateResume} />
          <Tab label="Search" />
          <Tab label="View in pdf" />
          <Tab label="Settings" />
        </Tabs>
      </div>

      <div>
        {value === 0 && <CreateResume setTabValue={setTabValue} />}
        {value === 1 && <GetResume setTabValue={setTabValue} />}
        {value === 2 && <GeneratePDF setTabValue={setTabValue} />}
        {value === 3 && (
          <>
            <Button variant="contained" onClick={Logout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ResumeTabs;
