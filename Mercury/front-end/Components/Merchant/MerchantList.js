import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import MerchantEdit from "./MerchantEdit";
// import RewardShare from "./RewardShare";
import MerchantInput from "./MerchantInput";
// import { CSVLink } from "react-csv";
function MerchantList() {
  const [merchant, setMerchant] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  // const [location, setLocation] = useState([]);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(merchant.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = merchant.slice(indexOfFirstItem, indexOfLastItem);

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
  const deleteTodo = async merchant_name => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/bmgs/merchant/${merchant_name}`, {
        method: "DELETE"
      });
      console.log(deleteTodo);
      setMerchant(merchant.filter(merchant => merchant.merchant_name !== merchant_name));
      toast.success("Successful Deleted!");
    } catch (err) {
      console.error(err.message);
    }
  };
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs/merchant");
      const jsonData = await response.json();
      setMerchant(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getTodos();
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
  const renderData = (merchant) => {
    return (
      <div className = "container">
       
        <MerchantInput></MerchantInput>
        <input
          className="search lower"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></input>
      <table className="table mt-5 text-center table-form" responsive="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Phone</th> 
            <th>Store</th> 
            <th>Region</th>
            <th>Head Office</th> 
            <th>Additional Office</th>
            <th>Action</th>
            {/* <th>Share</th> */}
          </tr>
        </thead>
        <tbody>
        {merchant.filter((merchant) => {
                if (searchTerm === "") {
                  return merchant;
                } else if (
                  merchant.merchant_category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return merchant;
                }
              }).map((merchant, locations) => (
            <tr key={merchant.merchant_id + locations.location_id } >
              <td>{merchant.merchant_name}</td>
              <td>{merchant.merchant_category}</td>
              <td>{merchant.merchant_phone}</td>
              <td>{merchant.location_store}</td>
              <td>{merchant.location_region}</td>
              <td>{merchant.head_office}</td>
              <td>{merchant.additional_office}</td>
              <td>
                <MerchantEdit merchant={merchant} />
                <button className="btn btn-danger action ml-1" onClick={() => deleteTodo(merchant.merchant_name)}>
                  X
                </button>
              </td> 
          {/* * <RewardShare ></RewardShare>    {/ */}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
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
export default MerchantList;
