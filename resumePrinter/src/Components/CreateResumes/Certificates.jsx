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
const certificatesData = {
  certificateName: "",
  issuedBy: "",
  certificateDate: CurrendDate(),
  certificateDetails: "",
  issuerAddress: "",
  issuerWebsite: "",
};

function Certificates() {
  const [certeficateFormData, setcerteficateFormData] =
    useState(certificatesData);
  const [AddNewCerteficates, setAddNewCerteficates] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  let { txtsFormData, setTextFormData } = useContext(ResumeContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcerteficateFormData({
      ...certeficateFormData,
      [name]: value,
    });
  };
  useEffect(() => {
    let {
      certificateName,
      issuedBy,
      certificateDate,
      certificateDetails,
      issuerAddress,
      issuerWebsite,
    } = certeficateFormData;
    if (
      !certificateName ||
      !issuedBy ||
      !certificateDate ||
      !certificateDetails ||
      !issuerAddress ||
      !issuerWebsite
    ) {
      return setShowAddButton(false);
    }
    setShowAddButton(true);
  }, [certeficateFormData]);

  return (
    <div>
      {txtsFormData.Certificates.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Certificate Name</TableCell>
                <TableCell>Issued By </TableCell>
                <TableCell>Certificate Date</TableCell>
                <TableCell>Certificate Details</TableCell>
                <TableCell>Issuer Address</TableCell>
                <TableCell>Issuer Website</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {txtsFormData.Certificates.map((Certificate) => {
                return (
                  <TableRow>
                    <TableCell>{Certificate.certificateName}</TableCell>
                    <TableCell>{Certificate.issuedBy}</TableCell>
                    <TableCell>{Certificate.certificateDate}</TableCell>
                    <TableCell>{Certificate.certificateDetails}</TableCell>
                    <TableCell>{Certificate.issuerAddress}</TableCell>
                    <TableCell>
                      <a target="_blank" href={Certificate.issuerWebsite}>
                        {Certificate.issuerWebsite}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => {
                          setFormData({
                            ...txtsFormData,
                            Certificates: txtsFormData.Certificates.filter(
                              (Certificate) => Certificate !== Certificate
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
        <>
          <h3 style={{ color: "red" }}>No data Found</h3>
        </>
      )}
      {!AddNewCerteficates && (
        <Button
          variant="contained"
          onClick={() => {
            setAddNewCerteficates(true);
          }}
        >
          Add New Certificate
        </Button>
      )}
      <Modal open={AddNewCerteficates}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              maxWidth: "400px",
              backgroundColor: "white",
              padding: "30px",
            }}
          >
            <TextField
              type="text"
              label="certificates"
              name="certificateName"
              value={certeficateFormData.certificateName}
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Issued By"
              name="issuedBy"
              onChange={handleChange}
              value={certeficateFormData.issuedBy}
            />
            <TextField
              type="date"
              label="Certificate Date"
              name="certificateDate"
              onChange={handleChange}
              value={certeficateFormData.certificateDate}
            />
            <TextField
              type="text"
              label="certificate Details"
              name="certificateDetails"
              onChange={handleChange}
              value={certeficateFormData.certificateDetails}
            />
            <TextField
              type="text"
              label="Issuer Address"
              name="issuerAddress"
              onChange={handleChange}
              value={certeficateFormData.issuerAddress}
            />
            <TextField
              type="url"
              label="Issuer Website"
              name="issuerWebsite"
              onChange={handleChange}
              value={certeficateFormData.issuerWebsite}
            />
            <div>
              {showAddButton ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    setTextFormData({
                      ...txtsFormData,
                      Certificates: [
                        ...txtsFormData.Certificates,
                        certeficateFormData,
                      ],
                    });
                    setcerteficateFormData(certificatesData);
                    setAddNewCerteficates(false);
                  }}
                >
                  Add Certificate
                </Button>
              ) : (
                <Button disabled>Add </Button>
              )}
              <Button onClick={() => setAddNewCerteficates(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Certificates;
