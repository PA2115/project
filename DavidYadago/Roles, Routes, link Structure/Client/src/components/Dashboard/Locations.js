import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LocationList from "../Locations/LocationList";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import BusinessIcon from "@material-ui/icons/Business";
import AddLocationIcon from "@material-ui/icons/AddLocation";
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
    height: 240,
  },
}));

export default function Locations(props) {
  const [name, setName] = useState("");
  var ciphertext = localStorage.getItem("Urr");

  const getProfile = async () => {
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
  }, []);
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
            Locations
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
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <LocationList></LocationList>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  );

  function Decrypt(ciphertext) {
    var bytes = CryptoJS.AES.decrypt(ciphertext, "345214612");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
