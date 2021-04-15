import React, { Fragment } from "react";

import RewardList from "./Components/Crud/RewardList";

const Rewards = ({setAuth}) => {
  setAuth(true);
  return (
    <Fragment>
      <div className="rewards">
        <div className="container">
         
          <RewardList></RewardList>
          <div className="sidebar"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Rewards;
