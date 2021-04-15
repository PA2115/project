import React, { Fragment, useState, useEffect } from "react";

const RewardInput = () => {
  // const [offer_name, setName] = useState("");
  // const [offer_category, setCategory] = useState("");
  // const [offer_action, setAction] = useState("");
  const [merchant_name, setMerchantName] = useState("");
  const [merchant_category, setMerchantCategory] = useState("");
  const [business_phone, setBusinessPhone] = useState("");
  const [o_id, setO] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      //offer_name,  offer_category, offer_action,
      const body = {
        o_id,  merchant_category, merchant_name,business_phone
      };
      const response = await fetch("http://localhost:5000/bmgs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      window.location = "/Rewards";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <br></br>
      <br></br>
      <h1 className="text-center">Rewards</h1>
      <div>
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#myModal"
        >
          Add Offer
        </button>
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Offer</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmitForm}>
                {/* <input
                  type="text"
                  className="form-control"
                  value={offer_name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter offer name"
                />
                <br></br>
             
            
                <input
                  type="text"
                  className="form-control"
                  value={offer_category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category"
                />
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  value={offer_action}
                  onChange={(e) => setAction(e.target.value)}
                  placeholder="Enter action"
                />
                <br></br> */}
                <input
                  type="text"
                  className="form-control"
                  value={merchant_name}
                  onChange={(e) => setMerchantName(e.target.value)}
                  placeholder="Enter merchant name"
                  required
                />
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  value={merchant_category}
                  onChange={(e) => setMerchantCategory(e.target.value)}
                  placeholder="Enter merchant category"
                  required
                />
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  value={business_phone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
                <br></br>
                <input
                  type="range"
                  type="number" step="1" min="1" max="6"
                  className="form-control"
                  value={o_id}
                  onChange={(e) => setO(e.target.value)}
                  placeholder="Select the coupon id"
                  required
                />
                <button className="btn btn-success">Add</button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RewardInput;
