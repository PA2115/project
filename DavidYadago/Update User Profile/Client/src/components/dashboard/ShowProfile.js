import React, { Component, Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
import { toast } from "react-toastify";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/Business";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { parse } from "@fortawesome/fontawesome-svg-core";
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

const Style = styled.div`
  .pass-wrapper {
    position: relative;
    margin-bottom: 14px;
  }

  i {
    position: absolute;
    top: 58%;
    right: 4%;
  }
  i:hover {
    color: #00fcb6;
    cursor: pointer;
  }
  .container {
    margin-top: -30px;
    border-radius: 5px;
    background-color: #fdfdfd;
  }
  .head {
    text-align: center;
    padding-top: 20px;
  }
  .outer-container {
    background-image: none;
    background-color: #dcdcdc;
    overflow: hidden;
  }
  .container {
    width: auto;
  }
  h1 {
    color: #000000;
    font-family: Helvetica, "Open Sans", Arial, sans-serif;
    font-size: 28px;
    font-weight: bold;
  }
`;

export default function ShowProfile(props) {
  var ciphertext = localStorage.getItem("Urr");

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    company: "",
    address: "",
  });

  const [validationError, setvalidationError] = useState("");
  const [validationPass, setvalidationPass] = useState("");

  const { name, email, company, address } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    const resp = await fetch("http://localhost:5000/roles", {
      method: "POST",
      headers: { jwt_token: localStorage.token },
    });
    const parseDatas = await resp.json();
    e.preventDefault();
    var oldemail = parseDatas.user_email;
    try {
      const response = await axios.post(
        "http://localhost:5000/updateUserDetails",
        {
          name,
          email,
          company,
          address,
          oldemail,
        }
      );
      console.log("responsedata:" + response.data);
      if (response.data === "updated") {
        setvalidationPass("updated");
        setvalidationError("");
      } else {
        setvalidationError("failed");
        setvalidationPass("");
      }
    } catch (error) {}
  };

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/roles", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      if (parseData) {
        setInputs({
          name: parseData.user_name,
          email: parseData.user_email,
          company: parseData.user_company,
          address: parseData.user_address,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Urr");
    toast.success("Logout successfully");

    history.go("/login");
  };

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
            Users
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
                <Style>
                  <div className="outer-container">
                    <div className="container">
                      <h1 className="text-center">Update Profile Details</h1>
                      <form className="login-form">
                        {validationError === "failed" && (
                          <div style={{ width: 340 }}>
                            <p style={{ color: "red" }}>
                              Email already in use. Please try a different
                              email.
                            </p>
                          </div>
                        )}
                        {validationPass === "updated" && (
                          <div style={{ width: 370 }}>
                            <p style={{ color: "green" }}>
                              Profile details successfully updated.
                            </p>
                          </div>
                        )}
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <input
                            value={name}
                            type="text"
                            name="name"
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            placeholder="Name"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input
                            value={email}
                            type="text"
                            name="email"
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="company">Company:</label>
                          <input
                            value={company}
                            type="text"
                            name="company"
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            placeholder="Company"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Address:</label>
                          <input
                            value={address}
                            type="text"
                            name="address"
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            placeholder="Address"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => updateProfile(e)}
                          id="submit"
                          name="submit"
                          className="btn btn-primary pull-right"
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </Style>
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
