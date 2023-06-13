import React from "react";
import BackgroundImage from "../../assets/images/background.webp";
import { useParams } from "react-router-dom";

const SearchPage = () => {
    const {value} = useParams()
    
  return (
    <>
      <img src={BackgroundImage} className="bg" />
      <div>{value}</div>
    </>
  );
};

export default SearchPage;
