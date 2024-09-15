import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ url }) => {
  return <QRCode style={{ height: "100px", width: "100px" }} value={url} />;
};

export default QRCodeGenerator;
