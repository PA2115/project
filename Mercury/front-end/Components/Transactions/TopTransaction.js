import React, { Fragment, useEffect, useState } from "react";

function TopTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  //const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(transactions.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

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
//   const deleteTodo = async id => {
//     try {
//       const deleteTodo = await fetch(`http://localhost:5000/locations/${id}`, {
//         method: "DELETE",
//       });
      
//       setLocations(locations.filter(locations => locations.location_id !== id));
//       toast.success("Successful Deleted!")
//     } catch (err) {
//       console.error(err.message);
//     }
//   };
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs/transactions/top");
      const jsonData = await response.json();
      setTransactions(jsonData);
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
  const renderData = (transactions) => {
    return (
      <div className = "container">
      <table className="table mt-5 text-center table-form" responsive="md">
        <thead>
        <tr >
            <th colSpan="6">TOP Transactions</th>
        </tr>
          <tr>    
            <th>Name</th>
            <th>Fee</th>
            <th>Tax</th> 
            <th>Total</th> 
            <th>No. Times Shared</th>
  
            {/* <th>Share</th> */}
          </tr>
        </thead>
        <tbody>
        {transactions.map((transactions) => (
            <tr key={transactions.transaction_id }>
              <td>{transactions.transaction_name}</td>
              <td>{transactions.transaction_fee}</td>
              <td>{transactions.transaction_tax}</td>
              <td>{transactions.transaction_total}</td>
              <td>{transactions.shared_action}</td>
    
             {/* <td>
                   {<LocationEdit locations={locations}/>} */}
                {/* <MerchantEdit merchant={merchant} /> */}
                {/* <button
                  className="btn btn-danger action ml-1"
                  onClick={() => deleteTodo(transactions.transactions_id)}
                >
                  X
                </button> 
              </td> */}
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
export default TopTransaction;
