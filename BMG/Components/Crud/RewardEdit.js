import React, { Fragment, useState } from "react";

const RewardEdit = ({ offer }) => {
  // const [offer_name, setName] = useState(offer.offer_name);
  // const [offer_expiry, setExpiry] = useState(offer.offer_expiry);
  // const [offer_category, setCategory] = useState(offer.offer_category);
  // const [offer_action, setAction] = useState(offer.offer_action);
  const [merchant_name, setMerchantName] = useState(offer.merchant_name);
  const [merchant_category, setMerchantCategory] = useState(
    offer.merchant_category
  );
  const [business_phone, setBusinessPhone] = useState(offer.business_phone);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { merchant_category, merchant_name, business_phone };
      const response = await fetch(
        `http://localhost:5000/bmgs/${offer.offer_id}${offer.merchant_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      console.log(body);
      alert(
        `ID: ${offer.offer_id} ${offer.merchant_name} Updated sucessfully!`
      );
      window.location = "/Rewards";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning action"
        data-toggle="modal"
        data-target={`#id${offer.offer_id}`}
      >
        Edit
      </button>
      <div
        className="modal fade"
        id={`id${offer.offer_id}`}
        onClick={() =>
          setMerchantName(offer.merchant_name) +
          setMerchantCategory(offer.merchant_category) +
          setBusinessPhone(offer.business_phone)
        }
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Offers</h4>
            </div>
            <form>
              <div className="modal-body">
                {/* <input
                  type="text"
                  className="form-control"
                  value={offer_name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  value={offer_expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                ></input>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  value={offer_category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  value={offer_action}
                  onChange={(e) => setAction(e.target.value)}
                ></input>
                <br></br> */}
                <input
                  type="text"
                  className="form-control"
                  value={merchant_name}
                  onChange={(e) => setMerchantName(e.target.value)}
                ></input>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  value={merchant_category}
                  onChange={(e) => setMerchantCategory(e.target.value)}
                ></input>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  value={business_phone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                ></input>
                <br></br>
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setBusinessPhone(offer.setBusinessPhone)}
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
export default RewardEdit;
