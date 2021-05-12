import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const DistributionSend = () => {

  const [distribution_name, setName] = useState("");
  const [distribution_description, setDescription] = useState("");
  const [distribution_type, setType] = useState("");
  const [distribution_by, setBy] = useState("");
  const [merchant_id, setMerchantId] = useState("");
  const [offer, setOffer] = useState([]);
  const [merchant, setMerchant] = useState([]);

  //used for inserting data into database
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        merchant,
        distribution_name,
        distribution_description,
        distribution_type,
        distribution_by,
        offer,
      };
      const response = await fetch("http://localhost:5000/bmgs/distributions", {
        method: "POST",
        cors: "no-cors",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      toast.success("Distributed offer successfully")
      window.alert("Send Sucessful");
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  }; const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs/merchant");
      const jsonData = await response.json();
      setMerchant(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  //used to get all the data
  const getOffer = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs/offer");
      const jsonData = await response.json();
      setOffer(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getOffer();
  }, []);

  return (
    <Fragment>
   
      <div className="merchant">
          <h1 className="text-center">Distribution List</h1>
     
        <button
          type="button"
          className="btn btn-success lower"
          data-toggle="modal"
          data-target="#myModal"
        >
          Distribute Offers
        </button>
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Select Offer to distribute</h4>
                <button type="button" className="close"data-dismiss="modal" onClick={() => setName(distribution_name)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
  
                <form onSubmit={onSubmitForm}>
                  <select className="custom-select" onChange={(e) => setName(e.target.value)} required>
                  <option value="" selected disabled hidden>Choose Offer</option>
                    {offer.map((offer) => (
                      <option value={offer.offer_name} >
                        {offer.offer_name}
                      </option>
                    ))}
                  </select>
                  
                  <br></br>
                  <br></br>

                  <select className="custom-select" onChange={(e) => setDescription(e.target.value)} required>
                   <option value="" selected disabled hidden>Choose Description</option>  
                   {offer.map((offer) => (
                      <option value={offer.offer_description} key={offer.offer_description}>
                        {offer.offer_description}
                      </option>
                    ))}
                  </select>
                  <br></br>
                  <br></br>

                  <select
                    className="custom-select"
                    onChange={(e) => setType(e.target.value)}
                    value={offer.offer_type} required
                  ><option value="" selected disabled hidden>Choose Type</option>  
                    {offer.map((offer) => (
                      <option value={offer.offer_type} key={offer.offer_type}>{offer.offer_type}</option>
                    ))}
                  </select>
                  <br></br>
                  <br></br> 
                  <select
                    className="custom-select"
                    onChange={(e) => setBy(e.target.value)} required
                  ><option value="" selected disabled hidden>Choose Merchant</option>  
                    {merchant.map((merchant) => (
                      <option key={merchant.merchant_name}>{merchant.merchant_name}</option>
                    ))}
                  </select> 
                  <br></br>
                  <hr></hr>
                  <p><h6>Are you sure you want to distribute?</h6></p> 
             
                  <button className="btn btn-success mr-1">Yes </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    No
                  </button>
                </form>
              </div>

              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
  
    </Fragment>
  );
};

export default DistributionSend;
