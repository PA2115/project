import React, {Fragment, useState} from 'react'
import { toast } from 'react-toastify';

export const UploadImage = () => {
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
            toast.success("Image Uploaded!")
         
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
    

    return (
       <Fragment>
           <form  onSubmit={onSubmitHandler}>
                <input className ="form-control form-control-sm" style={{textAlign:"center"}}   type="file" onChange={fileChangeHandler} />
                <hr></hr>
                <button className ="btn btn-outline-info btn-sm" type="submit" >Upload Coupon</button>
            </form>
       </Fragment>
    )
}

