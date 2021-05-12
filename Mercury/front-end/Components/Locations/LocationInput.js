import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactFlagsSelect from 'react-flags-select';
import { Us } from 'react-flags-select';
import RegionSelect from 'react-region-flag-select';
import ReactRegionSelect from 'react-region-select';
const LocationInput = () => {
   
  const [location_store, setLocationStore] = useState("");
  const [location_region, setRegion] = useState("");
  const [head_office, setHeadOffice] = useState("");
  const [additional_office, setAdditionalOffice] = useState("");
  const [location, setlocation] = useState([]);
  const [selected, setSelected] = useState('');
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        location_store,
        location_region,
        head_office, 
        additional_office,
        location
      };
      const response = await fetch("http://localhost:5000/bmgs/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.reload();
      toast.success("Location entered sucessfully!");
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getLocation = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs/locations");
      const jsonData = await response.json();
      setlocation(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getLocation();
    
   
  }, []); 
  const handleChangeMethod=(data)=>{
      console.log('Result',data);
  }
  return (
    <Fragment>
      <div className="merchant">
        <h1 className="text-center">Location List</h1>
        <button
          type="button"
          className="btn btn-primary lower"
          data-toggle="modal"
          data-target="#myModal"
        >
          Add Location
        </button>
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Locations</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmitForm}>
                  <input
                    type="text"
                    className="form-control"
                    value={location_store}
                    onChange={(e) => setLocationStore(e.target.value)}
                    placeholder="Enter location of store"
                    required
                  />
                  <br></br>
                  {/* <input
                    type="text"
                    className="form-control"
                    value={location_region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Enter location region "
                    required
                  /> */}
                 <ReactFlagsSelect
                  selected={location_region}
                  onSelect={code => setRegion(code) }
                  selectButtonClassName="menu-flags-button"
                  searchable
                  
                />
              <br/>
{/*                   
                  <RegionSelect  selectedCountryCode={location_region} onChange={(e) => setRegion(e.target.value) } stateOnly={true}  countryCode={'AU'} />
                    <br/>
                  <RegionSelect  value={head_office} handleChange={(e) => setHeadOffice(e.target)} cityOnly={true} countryCode={'AU'}/>
                  <br/>  */}
                  <input
                    type="text"
                    className="form-control"
                    value={head_office}
                    onChange={(e) => setHeadOffice(e.target.value)}
                    placeholder="Enter head office location "
                    required
                  /><br></br>
                   <input
                    type="text"
                    className="form-control"
                    value={additional_office}
                    onChange={(e) => setAdditionalOffice(e.target.value)}
                    placeholder="Enter additional office location "
                    required
                  />
       
                  
                  {/* <br></br>
                <select className ="custom-select" onChange={(e) => setLocationStore(e.target.value)} >
                  {location.map((locations) => (<option key={locations.location_store}> {locations.location_store} </option>
                ))}

                 </select> */}
           
                  <br></br>
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
      </div>
    </Fragment>
  );
};

export default LocationInput;
