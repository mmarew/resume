import React from "react";
import "./Titleinfo.css";

function TitleInfo({ Title }) {
  return (
    <div className="TitleInfo">
      <span>{Title}</span>
      <hr />
    </div>
  );
}

export default TitleInfo;
