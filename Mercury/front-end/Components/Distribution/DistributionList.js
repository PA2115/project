import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DistributionSend from "./DistributionSend";

function DistributionList() {
  const [distribution, setDistribution] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState([]);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(distribution.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = distribution.slice(indexOfFirstItem, indexOfLastItem);

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
  //   const deleteTodo = async merchant_name => {
  //     try {
  //       const deleteTodo = await fetch(`http://localhost:5000/bmgs/merchant/${merchant_name}`, {
  //         method: "DELETE",
  //       });

  //       setMerchant(merchant.filter(merchant => merchant.merchant_name !== merchant_name));
  //       toast.success("Successful Deleted!")
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };
  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs/distributions");
      const jsonData = await response.json();
      setDistribution(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getItems();
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
  const renderData = (distribution) => {
    return (
      <div className="container">
        <div className="merchant">
         <DistributionSend></DistributionSend>
</div>
        {/* <input
          className="search lower"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></input> */}
        <table className="table mt-5 text-center table-form" responsive="md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Type</th>
              <th>By</th>
              {/* <th>Action</th> */}
              {/* <th>Share</th> */}
            </tr>
          </thead>
          <tbody>
            {distribution
              .filter((distribution) => {
                if (searchTerm === "") {
                  return distribution;
                } else if (
                  distribution.distribution_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return distribution;
                }
              })
              .map((distribution, offer, merchant) => (
                <tr
                  key={
                    distribution.distribution_id +
                    offer.offer_id +
                    merchant.merchant_id
                  }
                >
                  <td>{distribution.offer_name}</td>
                  <td>{distribution.offer_description}</td>
                  <td>{distribution.offer_expiry}</td>
                  <td>{distribution.offer_type}</td>
                  <td>{distribution.merchant_name}</td>
                  {/* <td><DistributionSend></DistributionSend></td>  */}
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
  return <Fragment>{renderData(currentItems)}</Fragment>;
}
export default DistributionList;
