import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

import moment from 'moment';
const RewardEdit = ({ offer, setTodosChange }) => {
    const [offer_name, setName] = useState(offer.offer_name);
    const [offer_description, setDescription] = useState(offer.offer_description);
    const [offer_type, setType] = useState(offer.offer_type);
    const [offer_expiry, setExpiry] = useState(offer.offer_expiry);
    const [offer_category, setCategory] = useState(offer.offer_category);
    const [offer_action, setAction] = useState(offer.offer_action);
    
    
    const editText = async id => {
      try {
        const body = { offer_name, offer_description, offer_type, offer_expiry, offer_category, offer_action };
  
        const myHeaders = new Headers();
  
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("jwt_token", localStorage.token);
  
        await fetch(`http://localhost:5000/dashboard/offers/${id}`, {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body)
        });
     
        setTodosChange(true);
     toast.success("Updated!");
        // window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    };
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning action"
        data-toggle="modal"
        data-target={`#id${offer.offer_id}`}
      >
        Edit
      </button>
      <div
        class="modal"
        id={`id${offer.offer_id}`}
        onClick={() => 
            setName(offer.offer_name)+setDescription(offer.offer_description) + setCategory(offer.offer_category) + setType(offer.offer_type)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Offer</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => 
                  setName(offer.offer_name)+setDescription(offer.offer_description) + setCategory(offer.offer_category) + setType(offer.offer_type) }
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <form>
              <input type="text" className="form-control" value={offer_name} onChange={e => setName(e.target.value)} placeholder= "Enter offer Name" required/><br></br>
              <textarea rows="4" cols="50" type="text" className="form-control" value={offer_description} onChange={e => setDescription(e.target.value)} placeholder= "Enter offer Name" required/><br></br>
              <input type="text" className="form-control" value={offer_type} onChange={e => setType(e.target.value)} placeholder= "Enter offer type" required/><br></br>
              <input type="text" className="form-control" value={offer_category} onChange={e => setCategory(e.target.value)} placeholder= "Enter offer category" required/><br></br>
              {/* <input type="text" className="form-control" value={offer_action} onChange={e => setAction(e.target.value)} placeholder= "Enter offer action" required/><br></br> */}
              </form>
            </div>  
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => editText(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setName(offer.offer_name)}
              >
                X
              </button>
              </div>
            </div>
          </div>
        </div>
    
    </Fragment>
  );
};
export default RewardEdit;
