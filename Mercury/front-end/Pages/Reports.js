import { toast } from "react-toastify";

import React, { useState, refs} from "react";
const axios = require("axios");
const Reports = () => {
    const [fileData, setFileData] = useState();

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Handle File Data from the state Before Sending
    const data = new FormData();

    data.append("image", fileData);

    fetch("http://localhost:5000/single", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        console.log("File Sent Successful");
        toast.success("File Sent Successfully!")
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <h1>React App File Uploading</h1>
      <form onSubmit={onSubmitHandler} >
        <input type="file" onChange={fileChangeHandler} />
        <hr></hr>
        <button className ="btn btn-info" type="submit" >Upload Coupon</button>
      </form>
      
    </div>
  );
}
export default Reports;
