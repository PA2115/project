import React, { Fragment, useState, useEffect } from "react";

const MerchantInput = () => {
  const [merchant_name, setName] = useState("");
  const [merchant_category, setCategory] = useState("");
  const [merchant_phone, setPhone] = useState("");
  const [location_store, setLocationStore] = useState("");
  const [location, setlocation] = useState([]);

  
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        merchant_name,
        merchant_category,
        merchant_phone,
        location_store,
        location
      };
      const response = await fetch("http://localhost:5000/bmgs/merchant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.reload();
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
  return (
    <Fragment>
      <div className="merchant">
        <h1 className="text-center">Merchant List</h1>
        <button
          type="button"
          class="btn btn-primary lower"
          data-toggle="modal"
          data-target="#myModal"
        >
          Add Merchant
        </button>
        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add Merchant</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form onSubmit={onSubmitForm}>
                  <input
                    type="text"
                    className="form-control"
                    value={merchant_name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter merchant Name"
                    required
                  />
                  <br></br>
                  <input
                    type="text"
                    className="form-control"
                    value={merchant_category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter merchant category"
                    required
                  />
                  <br></br>
            
                  <input
                    type="text"
                    className="form-control"
                    value={merchant_phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter merchant phone"
                    required
                  />
                  <br></br>
                <select className ="custom-select" onChange={(e) => setLocationStore(e.target.value)} >
                  {location.map((locations) => (<option key={locations.location_store}> {locations.location_store} </option>
                ))}

                 </select>
                 <br></br>
                  <br></br>
                  <button className="btn btn-success">Add</button>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
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

export default MerchantInput;
