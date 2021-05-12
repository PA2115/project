import React, {Fragment, useState} from 'react'
import { toast } from 'react-toastify';

const MerchantEdit = ( { merchant } ) => {
    const [merchant_name, setName] = useState(merchant.merchant_name);
    const [merchant_category, setCategory] = useState(merchant.merchant_category);
    const [merchant_phone, setPhone] = useState(merchant.merchant_phone);
    
    const updateItems = async e => {
        e.preventDefault();
        try{
        const body = { merchant_name, merchant_category, merchant_phone};
        const response = await fetch(
          `http://localhost:5000/bmgs/merchant/${merchant.merchant_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          }
        );
        toast.success("Updated successfully!");
        console.log(response);
        window.location.reload();
        }catch (err) {
            console.error(err.message);
          }
    }

    return (
        <Fragment>
      <button
        type="button"
        class="btn btn-warning action"
        data-toggle="modal"
        data-target={`#id${merchant.merchant_id}`}
      >
        Edit
      </button>
      <div
        class="modal"
        id={`id${merchant.merchant_id}`}
        onClick={() => 
            setName(merchant.merchant_name)
          
          }
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Merchant</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => 

            setName(merchant.merchant_name)+
            setCategory(merchant.merchant_category)+
            setPhone(merchant.merchant_phone)
          
          } 
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
                <form>
                    <input type="text" className="form-control" value={merchant_name} onChange={e => setName(e.target.value)} /><br></br>
                    <input type="text" className="form-control" value={merchant_category} onChange={e => setCategory(e.target.value)} /><br></br>
                    <input type="text" className="form-control" value={merchant_phone} onChange={e => setPhone(e.target.value)}/><br></br>
                </form>
            </div>
            <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-dismiss="modal"  onClick={e => updateItems(e)}>Save</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setName(merchant.merchant_name)}>Dismiss</button>
                </div>
          </div>
        </div>
      </div>
    </Fragment>
     
    )
}

export default MerchantEdit;