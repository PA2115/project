import React, { Fragment, useEffect, useState } from 'react'
import Edit from './Edit';

const List = () => {
    const [bmgs, setBmgs] = useState([]);
    const deleteTodo = async offer_code => {
      try {
        const deleteTodo = await fetch(`http://localhost:5000/bmgs/${offer_code}`, {
          method: "DELETE"
        });
        console.log(deleteTodo);
        setBmgs(bmgs.filter(offer => offer.offer_code !== offer_code));
        alert(`Offer Code: ${offer_code} was deleted.`);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    const getTodos = async() => {
        try{
            const response = await fetch("http://localhost:5000/bmgs");
            const jsonData = await response.json();
            setBmgs(jsonData);
        }catch(err){
            console.error(err.message);
        }
    }
    useEffect(() =>  {
        getTodos();
    }, []);

    return(
       <Fragment>
           {" "}
       <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Offer_number</th>
        <th>Offer_take_up_location</th>
        <th>Offer_use_location</th>
        <th>Offer_user</th>
        <th>Offer_use_date</th>
        <th>Offer_use_time</th>
        <th>Offer_use_amount</th>
        <th>Offer_remaining</th>
        <th>Total_sale_value </th>
        <th>Repeat_visit_sales_value</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
         {bmgs.map(offer => (
            <tr key = {offer.offer_code}>
                <td>{offer.offer_number}</td>
                <td>{offer.offer_take_up_location}</td>
                <td>{offer.offer_use_location}</td>
                <td>{offer.offer_user}</td>
                <td>{offer.offer_use_date}</td>
                <td>{offer.offer_use_time}</td>
                <td>{offer.offer_use_amount} </td>
                <td>{offer.offer_remaining}</td>
                <td>{offer.total_sale_value}</td>
                <td>{offer.repeat_visit_sales_value}</td>
                <td><Edit offer = {offer}></Edit></td>
                <td><button className="btn btn-danger" onClick={() => deleteTodo(offer.offer_code)}>Delete</button></td>
                {/* <td><Edit offer = {todo}></Edit></td>
                <td><button className="btn btn-danger" onClick={() => deleteTodo(offer.offer_code)}>Delete</button></td> */}
                {/* <td>{bmg.description}</td>
                <td>{bmg.description}</td>
                <td>{bmg.description}</td>
                <td><Edit todo = {todo}></Edit></td>
                //<td><button className="btn btn-danger" onClick={() => deleteTodo(offer.offer_code)}>Delete</button></td>
                </tr> */}
                </tr>
        ))} 
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      
    </tbody>
  </table>
       </Fragment>
    );
}
export default List;