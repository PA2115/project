import React, { Fragment, useEffect, useState } from "react";
import Footer from '../Components/Navbar/Footer';
function Rewards() {
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
  // const deleteTodo = async id => {
  //   try {
  //     const deleteTodo = await fetch(`http://localhost:5000/bmgs/${id}`, {
  //       method: "DELETE",
  //     });
      
  //     setBmgs(bmgs.filter(offer => offer.offer_id !== id));
  //     // alert(`ID: ${offer_id} deleted sucessfully!`);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/bmgs/offer");
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

  // const handleLoadMore = () => {
  //   setitemsPerPage(itemsPerPage + 5);
  // };
  const renderData = (bmgs) => {
    return (
      <div className = "container">
       <h1 className="text-center my-5">Offers</h1>
      <table className="table mt-5 text-center table-form" responsive="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Expiry </th>
            <th>Type</th>
            <th>Category</th>
            <th>Offer Action</th>
            <th>Merchant Name</th>
            <th>Merchant Category</th>
            {/* <th>Share</th> */}
          </tr>
        </thead>
        <tbody>
          {bmgs.map((offer, merchant) => (
            <tr key={offer.id + merchant.id }>
              <td>{offer.offer_name}</td>    
              <td>{offer.offer_expiry}</td>
              <td>{offer.offer_type}</td>
              <td>{offer.offer_category}</td>
              <td>{offer.offer_action}</td>
              <td>{offer.merchant_name}</td>
              <td>{offer.merchant_category}</td>
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
      
      {/* <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button> */}
      <Footer></Footer>
    </Fragment>
  );
}
export default Rewards;
