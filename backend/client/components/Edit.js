import React, {Fragment, useState} from 'react';

const Edit = ({offer}) =>{

    const [offer_number, setNumber] = useState(offer.offer_number);
    const [offer_take_up_location, setTakeLocation] = useState(offer.offer_take_up_location);
    const [offer_use_location, setUseLocation] = useState(offer.offer_use_location);
    const [offer_user, setUser] = useState(offer.offer_user);
    const [offer_use_date, setDate] = useState(offer.offer_use_date);
    const [offer_use_time, setTime] = useState(offer.offer_use_time);
    const [offer_use_amount, setAmount] = useState(offer.offer_use_amount);
    const [offer_remaining, setRemaining] = useState(offer.offer_remaining);
    const [total_sale_value, setSalesValue] = useState(offer.total_sale_value);
    const [repeat_visit_sales_value, setRepeat] = useState(offer.repeat_visit_sales_value);
   
   
    const updateDescription = async e => {
        e.preventDefault();
        try {
          const body = { offer_number, offer_take_up_location, offer_use_location, offer_user, offer_use_date, offer_use_time, offer_use_amount, offer_remaining, total_sale_value, repeat_visit_sales_value };
          const response = await fetch(`http://localhost:5000/bmgs/${offer.offer_code}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            }
          );
        //  alert(`ID: ${todo.todo_id}\nDescription: ${description} Updated sucessfully!`);  
          window.location = "/";
        } catch (err) {
          console.error(err.message);
        }
      };
    return(
    <Fragment>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#offer_code${offer.offer_code}`} 
          onClick={() => 
          setNumber(offer.offer_number) +
          setTakeLocation(offer.offer_take_up_location) +
          setUseLocation(offer.offer_use_location) +
          setUser(offer.offer_user) +
          setDate(offer.offer_use_date) +
          setTime(offer.offer_use_time) +
          setAmount(offer.offer_use_amount) + 
          setRemaining(offer.offer_remaining) +
          setSalesValue(offer.total_sale_value) +
          setRepeat(offer.repeat_visit_sales_value)}>
          Edit
        </button>
        <div className="modal fade" id = {`offer_code${offer.offer_code}`}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title">Edit to do</h4>
                <button type="button" className="close" data-dismiss="modal" onClick={() => 
                  setNumber(offer.offer_number)+
                  setTakeLocation(offer.offer_take_up_location)+
                  setUseLocation(offer.offer_use_location)+
                  setUser(offer.offer_user)+
                  setDate(offer.offer_use_date)+ 
                  setTime(offer.offer_use_time)+
                  setAmount(offer.offer_use_amount)+
                  setRemaining(offer.offer_remaining)+
                  setSalesValue(offer.total_sale_value)+
                  setRepeat(offer.repeat_visit_sales_value)
                  }>&times;</button>
              </div>

              <form>

              <div className="modal-body">
                <input type="text" className="form-control" value = {offer_number} onChange={e => setNumber(e.target.value)}></input>
                <br></br>
                <input type="text" className="form-control" value = {offer_take_up_location} onChange={e => setTakeLocation(e.target.value)}></input>
                <br></br>
                <input type="text" className="form-control" value = {offer_use_location} onChange={e => setUseLocation(e.target.value)}></input>
                <br></br>
                <input type="text" className="form-control" value = {offer_user} onChange={e => setUser(e.target.value)}></input>
                <br></br>
                <input type="text" className="form-control" value = {offer_use_date} onChange={e => setDate(e.target.value)}></input>
                <br></br>
                <input type="text" className="form-control" value = {offer_use_time} onChange={e => setTime(e.target.value)}></input>
                <br></br>
                <input type="text" className="form-control" value = {offer_use_amount} onChange={e => setAmount(e.target.value)}></input>
                <br></br>
                <input type="text" className="form-control" value = {offer_remaining} onChange={e => setRemaining(e.target.value)}></input>
                <br></br>
                <input type="text" className="form-control" value = {total_sale_value} onChange={e => setSalesValue(e.target.value)}></input>
                <br></br>
                <input type="text" className="form-control" value = {repeat_visit_sales_value} onChange={e => setRepeat(e.target.value)}></input>
              </div>

              </form> 

              <div className="modal-footer">  
                <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setAmount(offer.setAmount)}>Close</button>
              </div>

            </div>
          </div>
        </div>
        </Fragment>
    );
}
export default Edit;