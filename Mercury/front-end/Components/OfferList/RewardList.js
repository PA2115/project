import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import RewardEdit from "./RewardEdit";
// import RewardShare from "./RewardShare";
import RewardInput from "./RewardInput";
import moment from 'moment';
import { UploadImage } from "./UploadImage";
// import { CSVLink } from "react-csv";
function RewardList({ allTodos, setTodosChange }) {
  console.log(allTodos);
  const [offer, setOffer] = useState([]);
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
  for (let i = 1; i <= Math.ceil(offer.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = offer.slice(indexOfFirstItem, indexOfLastItem);

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

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/offers/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setOffer(offer.filter(offer => offer.offer_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    setOffer(allTodos);
  }, [allTodos]);

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
  

  const renderData = (offer) => {
    return (
      <div className="container">
    

    <RewardInput setTodosChange={setTodosChange} />
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
              <th>Description</th>
              <th>Expiry </th>
              <th>Type</th>
              <th>Category</th>
              {/* <th>Offer Action</th> */}
              {/* <th>Merchant Name</th>
              <th>Merchant Category</th> */}
              <th>Coupon</th>
              <th>Action</th>
              {/* <th>Share</th> */}
            </tr>
          </thead>
          <tbody>

          {offer.length !== 0 &&
            offer[0].offer_id !== null &&
            offer.map(offer => (
              <tr key={offer.offer_id}>
                <td>{offer.offer_name}</td>
                <td>{offer.offer_description}</td>
                <td>{moment(offer.offer_expiry).format('DD/MM/YYYY, h:mm:ss a')}</td>
                <td>{offer.offer_type}</td>
                <td>{offer.offer_category}</td>
                {/* <td>{offer.offer_action}</td> */}
                <td><UploadImage></UploadImage></td>
                <td>
                <RewardEdit offer={offer} setTodosChange={setTodosChange} />
            
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(offer.offer_id)}
                  >
                    X
                  </button>
                  </td>
              </tr>
            ))}
            {/*             
            {offer
              .filter((offer) => {
                if (searchTerm === "") {
                  return offer;
                } else if (
                  offer.merchant_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return offer;
                }
              })
              .map((offer, merchant) => (
                <tr key={offer.id + merchant.id}>
                  <td>{offer.offer_name}</td>
                  <td>{moment(offer.offer_expiry).format('DD/MM/YYYY, h:mm:ss a')}</td>
                  <td>{offer.offer_type}</td>
                  <td>{offer.offer_category}</td>
                  <td>{offer.offer_action}</td>
                  <td>{offer.merchant_name}</td>
                  <td>{offer.merchant_category}</td>
                  <td>
                    <RewardEdit offer={offer} />
                    <button className="btn btn-danger action ml-1 confirm-bg" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?'));if(true){deleteTodo(offer.offer_name)}}}>
                     X
                    </button>
                  </td>
               
                </tr>
              ))} */}
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
  return <Fragment>{renderData(currentItems)}</Fragment>;
}
export default RewardList;
