import React, {Fragment, useState} from 'react';
const Input = ({offer}) => {

    const [offer_number, setNumber] = useState("");
    const [offer_take_up_location, setTakeLocation] = useState("");
    const [offer_use_location, setUseLocation] = useState("");
    const [offer_user, setUser] = useState("");
    const [offer_use_date, setDate] = useState("");
    const [offer_use_time, setTime] = useState("");
    const [offer_use_amount, setAmount] = useState("");
    const [offer_remaining, setRemaining] = useState("");
    const [total_sale_value, setSalesValue] = useState("");
    const [repeat_visit_sales_value, setRepeat] = useState("");
    
    const onSubmitForm = async e => {
      e.preventDefault();
      try {
        const body = { offer_number, offer_take_up_location, offer_use_location, offer_user, offer_use_date, offer_use_time, offer_use_amount, offer_remaining, total_sale_value, repeat_visit_sales_value };
        const response = await fetch("http://localhost:5000/bmgs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        console.log(response);
        window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    };
    return (
      <Fragment>
        <h1 className="text-center mt-5">Offer CRUD</h1>
        <button type="button" className="btn btn-success" data-toggle="modal" data-target={`#offer_code`} 
          onClick={() => 
          setNumber(offer_number) +
          setTakeLocation(offer_take_up_location) +
          setUseLocation(offer_use_location) +
          setUser(offer_user) +
          setDate(offer_use_date) +
          setTime(offer_use_time) +
          setAmount(offer_use_amount) + 
          setRemaining(offer_remaining) +
          setSalesValue(total_sale_value) +
          setRepeat(repeat_visit_sales_value)}>
          Add an Offer
        </button>

        <div className="modal fade" id = {`offer_code`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add an Offer</h4>
                <button type="button" className="close" data-dismiss="modal" onClick={() => 
                  setNumber(offer_number)+
                  setTakeLocation(offer_take_up_location)+
                  setUseLocation(offer_use_location)+
                  setUser(offer_user)+
                  setDate(offer_use_date)+ 
                  setTime(offer_use_time)+
                  setAmount(offer_use_amount)+
                  setRemaining(offer_remaining)+
                  setSalesValue(total_sale_value)+
                  setRepeat(repeat_visit_sales_value)
                  }>&times;</button>
              </div>
              <div className="modal-body">
        <form onSubmit={ onSubmitForm }>
          <input
            type="text"
            className="form-control"
            value={offer_number}
            onChange={e => setNumber(e.target.value)}
            placeholder="Enter offer number" required /><br></br>
            <input
            type="text"
            className="form-control"
            value={offer_take_up_location}
            onChange={e => setTakeLocation(e.target.value)}
            placeholder="Enter take up location" required /><br></br>
            <input
            type="text"
            className="form-control"
            value={offer_use_location}
            onChange={e => setUseLocation(e.target.value)}
            placeholder="Enter use location" required /><br></br>
            <input
            type="text"
            className="form-control"
            value={offer_user}
            onChange={e => setUser(e.target.value)}
            placeholder="Enter a user" required /><br></br>
            <input
            type="text"
            className="form-control"
            value={offer_use_date}
            onChange={e => setDate(e.target.value)}
            placeholder="Enter a date" required /><br></br>
            <input
            type="text"
            className="form-control"
            value={offer_use_time}
            onChange={e => setTime(e.target.value)}
            placeholder="Enter a time" required /><br></br>
            <input
            type="text"
            className="form-control"
            value={offer_use_amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter a amount" required /><br></br>
            <input
            type="text"
            className="form-control"
            value={offer_remaining}
            onChange={e => setRemaining(e.target.value)}
            placeholder="Enter a remaining" required /><br></br>
            <input
            type="text"
            className="form-control"
            value={total_sale_value}
            onChange={e => setSalesValue(e.target.value)}
            placeholder="Enter a sales value" required /><br></br>
            <input
            type="text"
            className="form-control"
            value={repeat_visit_sales_value}
            onChange={e => setRepeat(e.target.value)}
            placeholder="Enter a repeat value" required /><br></br>
          <button className="btn btn-success" >Add</button>
        </form>
        </div>
        <div className="modal-footer">  
                {/* <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setAmount(offer.setAmount)}>Close</button> */}
            </div>
          </div>
          </div>
          </div>
      </Fragment>
    );
  };

export default Input;
