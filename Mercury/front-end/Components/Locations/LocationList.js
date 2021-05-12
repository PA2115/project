import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import LocationEdit from "./LocationEdit";
import LocationInput from "./LocationInput";
// import MerchantEdit from "./MerchantEdit";
// import RewardShare from "./RewardShare";
// import MerchantInput from "./MerchantInput";
// import { CSVLink } from "react-csv";
const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(locations.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locations.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/bmgs/locations/${id}`, {
        method: "DELETE"
      });

      setLocations(locations.filter(locations => locations.location_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const getLocation = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs/locations/");
      const jsonData = await response.json();
      setLocations(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  // const handleLoadMore = () => {
  //   setitemsPerPage(itemsPerPage + 5);
  // };
  const renderData = (locations) => {
    return (
      <div className = "container">
        <LocationInput></LocationInput>
        <input className="search lower" type="text" placeholder="Search..." onChange={(e) => { setSearchTerm(e.target.value);}}></input>
      <table className="table mt-5 text-center table-form" responsive="md">
        <thead>
          <tr>
            <th>Store</th>
            <th>Region</th>
            <th>Head Office</th> 
            <th>Other Office</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
           {locations.filter((locations) => {
                if (searchTerm === "") {
                  return locations;
                } else if (
                  locations.location_store
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return locations;
                } 
              }).map(locations => (  
              <tr key = {locations.location_id}>
                <td>{locations.location_store}</td>
                <td>{locations.location_region}</td>
                <td>{locations.head_office}</td>
                <td>{locations.additional_office}</td> 
                <td><LocationEdit locations={locations}/>
                <button className="btn btn-danger action ml-1" onClick={() => deleteTodo(locations.location_id)}>
                X
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pageNumbers table-form">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              Prev
            </button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Fragment>
      {renderData(currentItems)}
    </Fragment>
  );
}
export default LocationList;
