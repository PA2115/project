import React, {Fragment, useState} from 'react'
import { toast } from 'react-toastify';

const LocationEdit = ({locations}) => {
    const [location_store, setLocationStore] = useState(locations.location_store);
    const [location_region, setRegion] = useState(locations.location_region);
    const [head_office , setHeadOffice] = useState(locations.head_office);
    const [additional_office, setAdditionalOffice] = useState(locations.additional_office);
    const [location, setlocation] = useState([]);
    const updateTodo = async e => {
        e.preventDefault();
        try{
        const body = { location_store, location_region, head_office, additional_office, location};
        const response = await fetch(
          `http://localhost:5000/bmgs/locations/${locations.location_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          }
        );
            toast.success("Updated successfully!");
            window.location.reload();
            console.log(response);
        }catch (err) {
            console.error(err.message);
          }
    }

    return (
        <Fragment>
      <button
        type="button"
        className="btn btn-warning action"
        data-toggle="modal"
        data-target={`#id${locations.location_id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${locations.location_id}`}
        onClick={() => 
            setLocationStore(locations.location_store)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Location</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => 
                    setLocationStore(locations.location_store) }
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
                <form>
                    <input type="text" className="form-control" value={location_store} onChange={e => setLocationStore(e.target.value)} /><br></br>
                    <input type="text" className="form-control" value={location_region} onChange={e => setRegion(e.target.value)} /><br></br>
                    <input type="text" className="form-control" value={head_office} onChange={e => setHeadOffice(e.target.value)}/><br></br>
                    <input type="text" className="form-control" value={additional_office} onChange={e => setAdditionalOffice(e.target.value)} /><br></br>
                </form>
            </div>
            <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-dismiss="modal"  onClick={e => updateTodo(e)}>Save</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setLocationStore(locations.setLocationStore)}>X</button>
                </div>
          </div>
        </div>
      </div>
    </Fragment>
     
    )
}

export default LocationEdit;