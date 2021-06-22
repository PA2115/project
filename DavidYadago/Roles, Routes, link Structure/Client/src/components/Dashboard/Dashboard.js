import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
//import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/Business";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
//import { mainListItems, secondaryListItems } from "./listItems";
import CPA, { OfferReach } from "./Chart";
//import DistributedOffers from "./DistributedOffers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TopTransaction from "../Transactions/TopTransaction";
import { useHistory } from "react-router-dom";
var CryptoJS = require("crypto-js");

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 350,
  },
}));
export default function Dashboard(props) {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      setAllTodos(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  var ciphertext = localStorage.getItem("Urr");

  const getProfile2 = async () => {
    try {
      const res = await fetch("http://localhost:5000/roles", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Urr");
    toast.success("Logout successfully");

    history.go("/login");
  };

  useEffect(() => {
    getProfile();
    getProfile2();
    setTodosChange(false);
  }, [todosChange]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Welcome {name} to your Dashboard!
          </Typography>
          <button className="btn btn-primary" to="/" onClick={(e) => logout(e)}>
            Log Out
          </button>
          {/* Put BMG logo here?? */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {/*-------Main List Item Start------- */}

        {Decrypt(ciphertext) === "normal" ? (
          <List>
            <div>
              <a href="/">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </div>
              </a>
              <a href="dashboard">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </div>
              </a>

              <a href="rewards">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <CardGiftcardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rewards" />
                  </ListItem>
                </div>
              </a>
            </div>
          </List>
        ) : Decrypt(ciphertext) === "staff" ? (
          <List>
            <div>
              <a href="/">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </div>
              </a>
              <a href="dashboard">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </div>
              </a>

              <a href="rewards">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <CardGiftcardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rewards" />
                  </ListItem>
                </div>
              </a>

              <a href="merchants">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Merchants" />
                  </ListItem>
                </div>
              </a>

              <a href="locations">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <AddLocationIcon />
                    </ListItemIcon>
                    <ListItemText primary="Locations" />
                  </ListItem>
                </div>
              </a>
            </div>
          </List>
        ) : Decrypt(ciphertext) === "admin" ? (
          <List>
            <div>
              <a href="/">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </div>
              </a>
              <a href="dashboard">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </div>
              </a>

              <a href="allrewards">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <CardGiftcardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rewards" />
                  </ListItem>
                </div>
              </a>

              <a href="merchants">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Merchants" />
                  </ListItem>
                </div>
              </a>

              <a href="locations">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <AddLocationIcon />
                    </ListItemIcon>
                    <ListItemText primary="Locations" />
                  </ListItem>
                </div>
              </a>

              <a href="users">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItem>
                </div>
              </a>
            </div>
          </List>
        ) : (
          <List>
            <div>
              <a href="/">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </div>
              </a>
              <a href="dashboard">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </div>
              </a>

              <a href="rewards">
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <CardGiftcardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rewards" />
                  </ListItem>
                </div>
              </a>
            </div>
          </List>
        )}
        <Divider />
        <List>
          <div>
            <ListSubheader inset>My Account</ListSubheader>
            <a href="updateprofile">
              <div>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update details" />
                </ListItem>
              </div>
            </a>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <span className="" to="/" onClick={(e) => logout(e)}>
                Log Out
              </span>
            </ListItem>
            <ListItem button></ListItem>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {Decrypt(ciphertext) === "staff" ? (
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={5}>
              {/* Chart */}
              <Grid item xs={30} md={6} lg={50}>
                <Paper className={fixedHeightPaper}>
                  <CPA />
                </Paper>
              </Grid>
              <Grid item xs={30} md={6} lg={50}>
                <Paper className={fixedHeightPaper}>
                  <OfferReach />
                </Paper>
              </Grid>
              <Grid>
                <Paper className={fixedHeightPaper}>
                  <TopTransaction></TopTransaction>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        ) : Decrypt(ciphertext) === "admin" ? (
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={5}>
              {/* Chart */}
              <Grid item xs={30} md={6} lg={50}>
                <Paper className={fixedHeightPaper}>
                  <CPA />
                </Paper>
              </Grid>
              <Grid item xs={30} md={6} lg={50}>
                <Paper className={fixedHeightPaper}>
                  <OfferReach />
                </Paper>
              </Grid>
              <Grid>
                <Paper className={fixedHeightPaper}>
                  <TopTransaction></TopTransaction>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        ) : (
          <>
            <div className="container">
              <br />
              <h5>
                Welcome {name} to your Dashboard. Please check the following
                pages available to you:
              </h5>
              <div className="featureborder">
                Rewards:{" "}
                <a href="/rewards">
                  <div>
                    <ListItem button>
                      <ListItemIcon>
                        <CardGiftcardIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Offer Rewards" />
                    </ListItem>
                  </div>
                </a>
                <p>
                  Here you can submit your offer rewards that you wish to
                  advertise <br /> through Billi by clicking on "Add Offer
                  Rewards".
                </p>
              </div>
              <br />
              <div className="featureborder">
                Profile:{" "}
                <a href="/updateprofile">
                  <div>
                    <ListItem button>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Update Profile Details" />
                    </ListItem>
                  </div>
                </a>
                <p>
                  Here you can view and update your current profile details
                  <br />
                  by clicking on "Update Profile Details".
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );

  function Decrypt(ciphertext) {
    var bytes = CryptoJS.AES.decrypt(ciphertext, "345214612");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
