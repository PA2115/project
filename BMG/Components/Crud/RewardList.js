import React, { Fragment, useEffect, useState } from "react";
import RewardEdit from "../Crud/RewardEdit";
import RewardShare from "./RewardShare";
import RewardInput from "./RewardInput";
// import { CSVLink } from "react-csv";
function RewardList() {
  const [bmgs, setBmgs] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(bmgs.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bmgs.slice(indexOfFirstItem, indexOfLastItem);

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
  const deleteTodo = async offer_id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/bmgs/${offer_id}`, {
        method: "DELETE",
      });
      console.log(deleteTodo);
      setBmgs(bmgs.filter(offer => offer.offer_id !== offer_id));
      alert(`ID: ${offer_id} deleted sucessfully!`);
    } catch (err) {
      console.error(err.message);
    }
  };
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs");
      const jsonData = await response.json();
      setBmgs(jsonData);
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

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };
  const renderData = (bmgs) => {
    return (
      <div className = "container">
       
<RewardInput></RewardInput>
    
      <table className="table mt-5 text-center table-form" responsive="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Expired Date </th>
            <th>Reward Category</th>
            <th>To claim</th>
            <th>Sponsored By</th>
            <th>Company Category</th>
            <th>Phone</th>
            <th>Action</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {bmgs.map((offer, merchant, business) => (
            <tr key={offer.id + merchant.id + business.id}>
              <td>{offer.offer_name}</td>    
              <td>{offer.offer_expiry}</td>
              <td>{offer.offer_category}</td>
              <td>{offer.offer_action}</td>
              <td>{offer.merchant_name}</td>
              <td>{offer.merchant_category}</td>
              <td>{offer.business_phone}</td>
              <td>
                <RewardEdit offer={offer} />
                <button
                  className="btn btn-danger action"
                  onClick={() => deleteTodo(offer.offer_id)}
                >
                  Delete
                </button>
              </td>
              <RewardShare ></RewardShare>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      </div>
    );
  };
  return (
    <Fragment>
      {renderData(currentItems)}
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
      {/* <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button> */}
      
    </Fragment>
  );
}
export default RewardList;
