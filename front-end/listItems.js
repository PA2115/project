import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BarChartIcon from '@material-ui/icons/BarChart';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReactDOM from "react-dom";
import Main from "/Users/tan1lba/IdeaProjects/mercury/src/main.js";


export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button >
            <ListItemIcon>
                <LocalOfferIcon/>
            </ListItemIcon>
          <ListItemText primary="Active Offers" />
        </ListItem>
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
            <ListItemText primary="Log Out" onClick={Log_Out}/>
        </ListItem>
        <ListItem button>
        </ListItem>
    </div>
);



function Log_Out(){

    ReactDOM.render(
        <Main />,
        document.getElementById('root')
    );
}

