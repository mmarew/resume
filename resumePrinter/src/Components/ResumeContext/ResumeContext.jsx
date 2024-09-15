import { createContext, useEffect, useState } from "react";
import ResumeTabs from "../ResumeTab/ResumeTab";
import resumeFormData from "../../Utilities/reumeFormData";
import { useNavigate } from "react-router-dom";
import decodeToken, { getEmailAndUniqueId } from "../../Utilities/DecodeToken";
let ResumeContext = createContext();
function App() {
  const [profileImage, setProfileImage] = useState(null);
  const [txtsFormData, setTextFormData] = useState({ ...resumeFormData });
  const [SelectedFiles, setSelectedFiles] = useState();
  const emailAndUniqueId = getEmailAndUniqueId();
  const [registerOrUpdateResume, setregisterOrUpdateResume] =
    useState("Register");
  let Navigate = useNavigate();
  useEffect(() => {
    console.log("getEmailAndUniqueId", !emailAndUniqueId);
    if (!emailAndUniqueId) {
      console.log("in navigate ");
      Navigate("/login");
    } else {
    }
  }, []);
  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <ResumeContext.Provider
        value={{
          SelectedFiles,
          setSelectedFiles,
          txtsFormData,
          setTextFormData,
          profileImage,
          setProfileImage,
          registerOrUpdateResume,
          setregisterOrUpdateResume,
        }}
      >
        {/* <FileUpload /> */}
        <h1>Dear {emailAndUniqueId?.Email} welcome to resume generator</h1>
        <ResumeTabs />
      </ResumeContext.Provider>
    </div>
  );
}
export { ResumeContext };
export default App;
