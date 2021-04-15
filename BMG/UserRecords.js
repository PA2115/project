import React, {useState, useEffect} from "react";

export const UserRecords = () => {
  const [records, setRecords] = useState([]);
  const getRecords = async () => {
    try {
      const response = await fetch("http://localhost:5000/records");
      const jsonData = await response.json();
      setRecords(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="container">
      {/* <RewardInput></RewardInput> */}
      <table className="table mt-5 text-center table-form" responsive="md">
        <thead>
          <tr>
            <th>Sent</th>
            <th>Referral Code</th>
            <th>Time Shared</th>
            <th>From</th>

          </tr>
        </thead>
        <tbody>
          {records.map(shared_users => (
            <tr key={shared_users.shared_id}>
              <td>{shared_users.shared_to_email}</td>
              <td>{shared_users.shared_referral_code}</td>
              <td>{shared_users.shared_time_added}</td>
              <td>{shared_users.email}</td>
{/*  
              <td>
                <RewardEdit offer={offer} />
                <button
                  className="btn btn-danger action"
                  onClick={() => deleteTodo(offer.offer_id)}
                >
                  Delete
                </button>
              </td>
              <RewardShare></RewardShare> */}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};
