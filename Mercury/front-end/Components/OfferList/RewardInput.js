import React, { Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const RewardInput = ({ setTodosChange }) => {
  const [offer_name, setName] = useState("");
  const [offer_description, setDescription] = useState("");
  const [offer_expiry, setExpiry] = useState(new Date());
  const [offer_type, setType] = useState("");
  const [offer_category, setCategory] = useState("");
  const [offer_action, setAction] = useState("");
  const [merchant_name, setMerchantName] = useState([]);
  const [merchant, setMerchant] = useState([]);
 
  let handleTime = time => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const body = {
      offer_name, offer_description, offer_type, offer_expiry, offer_category, offer_action, merchant_name};
      const response = await fetch("http://localhost:5000/dashboard/offers", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

        console.log(parseResponse);
        toast.success("Added Successfully!");
       
        setTodosChange(true);
        setName("");
        setDescription("");
        setType("");
        setCategory("");
    } catch (err) {
      console.error(err.message);
    }
  };
  const getMerchant = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs/merchant");
      const jsonData = await response.json();
      setMerchant(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getMerchant();
  }, []);
  // <MultiSelect onChange={(e) => setMerchantName(e.target.value)} >
  // {merchant.map((merchant) => 
  // (
  // <options key={merchant.merchant_name}> {merchant.merchant_name} </option>
  // )
  // )}
  // </MultiSelect>

  const [selected, setSelected] = useState([]);
  return (
    <Fragment> 
            <h1 className="text-center">Offer List</h1>
    <div>
     <button type="button" class="btn btn-primary  lower" data-toggle="modal" data-target="#exampleModalCenter">
  Add Offer
</button>


<div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Offer List</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form onSubmit={onSubmitForm}>
              <input type="text" className="form-control" value={offer_name} onChange={(e) => setName(e.target.value)} placeholder="Enter offer name" required/>
              <br/>
              <textarea rows="4" cols="50" type="text" className="form-control" value={offer_description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter offer description" />
              <br/>
              <DatePicker selected={offer_expiry} onChange={date => setExpiry(date)}  isClearable
              showTimeSelect placeholderText="Cleared!"  dateFormat="dd/MM/yyyy, hh:mm:dd a" timeClassName={handleTime}/>
              <br/>
              <br/>
              <input type="text" className="form-control" value={offer_type} onChange={(e) => setType(e.target.value)} placeholder="Enter offer type"/>
              <br/>
              <input type="text" className="form-control" value={offer_category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category"/>
              <br/>
              <input type="text" className="form-control" value={offer_action} onChange={(e) => setAction(e.target.value)} placeholder="Enter action"/>
              <br/> 
{/* 
              <Select isMulti value = "" onChange={(e) => setMerchantName(e.target.value)}
      >
        </Select>
        {merchant.map((merchant) => 
        (
        <options key={merchant.merchant_name}> {merchant.merchant_name} </options>
        ))} */}


            <select className ="custom-select"  onChange={(e) => setMerchantName(e.target.value)} >
            <option value={merchant_name} selected disabled hidden>Choose Merchant Name</option>  
            {merchant.map((merchant) => 
            (
            <option key={merchant.merchant_name}> {merchant.merchant_name} </option>
            ))}
            </select> 
    
              <br/>
              <br/>
                <button className="btn btn-success" >Add</button>
              </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" >Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
     
</div>
         
            

     
    </Fragment>
  );
};

export default RewardInput;
