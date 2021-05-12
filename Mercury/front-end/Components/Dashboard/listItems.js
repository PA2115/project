import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
// import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import ActiveOffers from "./ActiveOffers";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import RewardList from "../OfferList/RewardList";
import RewardsOffer from "./RewardsOffer";
import Users from "./Users";
import Merchants from "./Merchants";
import GroupIcon from '@material-ui/icons/Group';
// import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from '@material-ui/icons/Business';
import Locations from "./Locations";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import Transactions from "./Transactions";
import ReceiptIcon from '@material-ui/icons/Receipt';
import Distributions from './Distributions';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';



export const ListItems = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
};

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText
        primary="Dashboard"
        onClick={(event) =>
          ReactDOM.render(
            <React.StrictMode>
              <Dashboard />
            </React.StrictMode>,
            document.getElementById("root")
          )
        }
      />
    </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText
          primary="Active Offers"
          onClick={(event) =>
            ReactDOM.render(
              <React.StrictMode>
                <ActiveOffers />
              </React.StrictMode>,
              document.getElementById("root")
            )
          }
        />
      </ListItem> */}
        <ListItem button>
      <ListItemIcon>
        <ThumbUpAltIcon />
      </ListItemIcon>
      <ListItemText
        primary="Distributions"
        onClick={(event) =>
          ReactDOM.render(
            <React.StrictMode>
            <Distributions></Distributions>
            </React.StrictMode>,
            document.getElementById("root")
          )
        }
      />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <CardGiftcardIcon />
      </ListItemIcon>
      <ListItemText
        primary="Rewards"
        onClick={(event) =>
          ReactDOM.render(
            <React.StrictMode>
              <RewardsOffer></RewardsOffer>
            </React.StrictMode>,
            document.getElementById("root")
          )
        }
      />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText
        primary="Merchants"
        onClick={(event) =>
          ReactDOM.render(
            <React.StrictMode>
             <Merchants></Merchants>
            </React.StrictMode>,
            document.getElementById("root")
          )
        }
      />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddLocationIcon />
      </ListItemIcon>
      <ListItemText
        primary="Locations"
        onClick={(event) =>
          ReactDOM.render(
            <React.StrictMode>
            <Locations></Locations>
            </React.StrictMode>,
            document.getElementById("root")
          )
        }
      />
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText
        primary="Transactions"
        onClick={(event) =>
          ReactDOM.render(
            <React.StrictMode>
            <Transactions></Transactions>
            </React.StrictMode>,
            document.getElementById("root")
          )
        }
      />
    </ListItem> */}
  
    
    {/* <ListItem button>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText
        primary="Users"
        onClick={(event) =>
          ReactDOM.render(
            <React.StrictMode>
             <Users></Users>
            </React.StrictMode>,
            document.getElementById("root")
          )
        }
      />
    </ListItem> */}
      
  </div>
);

export const secondaryListItems = (
 
  <div>
    <ListSubheader inset>My Account</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Update details" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <span to="/" onClick={(e) => this.logout(e)}>Log Out</span>
    </ListItem>
    <ListItem button></ListItem>
  </div>
);

function goToAOpage() {
  ReactDOM.render(
    <React.StrictMode>
      <ActiveOffers />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
