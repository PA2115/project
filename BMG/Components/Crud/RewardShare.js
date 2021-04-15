import React, { Fragment, useState, useEffect } from "react";
//import { toast } from "react-toastify";

export const RewardShare = () => {
  const [shared_to_email, setSharedToEmail] = useState("");
  const [shared_referral_code, setSharedReferralCode] = useState("");
  const [user_email, setUserEmail] = useState(""); // for storing current email new
  const [email, setEmail] = useState(""); //from the login old

  const referralForm = async (e) => {
    e.preventDefault();
    try {
      const body = { shared_to_email, shared_referral_code, email};
      const response = await fetch("http://localhost:5000/bmgs/sharedUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    
      console.log(response);
     // window.alert("Shared successfully to " + `${shared_referral_code}`);
      // toast.success("Shared successfully to " + `${shared_referral_code}`);
      window.location = "/rewards";
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setEmail(parseData.user_email);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Fragment>
      <div>
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#share"
        >
          Share
        </button>
      </div>
      <div className="modal fade" id="share">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Share</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={referralForm}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={"Shared to .."}
                  value={shared_to_email}
                  onChange={(e) => setSharedToEmail(e.target.value)}
                ></input>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  placeholder={"Referral Code"}
                  value={shared_referral_code}
                  onChange={(e) => setSharedReferralCode(e.target.value)}
                ></input>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  placeholder={email}
                  value={user_email}
                  onChange={(e) => setUserEmail(e.target.value)}
                  readOnly
                ></input>
                <br></br>
                <button className="btn btn-success float-left" id="submit">
                  Share
                </button>
                <button
                  type="button"
                  className="btn btn-danger float-right"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </form>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default RewardShare;
