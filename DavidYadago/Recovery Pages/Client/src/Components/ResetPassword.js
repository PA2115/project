/* eslint-disable no-console */
import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "./Navbar/Footer";
import styled from "styled-components";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

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
    border-radius: 5px;
    background-color: #fdfdfd;
  }
  .head {
    text-align: center;
    padding-top: 20px;
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

const loading = {
  margin: "1em",
  fontSize: "24px",
};

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      updated: false,
      isLoading: true,
      error: false,
      passworderror: "",
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.get("http://localhost:5000/reset", {
        params: {
          resetPasswordToken: token,
        },
      });
      if (response.data.message === "password reset link a-ok") {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          isLoading: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put(
        "http://localhost:5000/updatePasswordViaEmail",
        {
          username,
          password,
          resetPasswordToken: token,
        }
      );
      console.log("responsemsg:" + response.data.message);
      if (response.data.message === "password updated") {
        this.setState({
          updated: true,
          error: false,
          passworderror: "",
        });
      } else if (response.data.message === "Password") {
        this.setState({
          passworderror:
            "Password must contain atleast one lowercase & uppercase letter, " +
            "a number and is at least 8 characters in length.",
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const { password, error, isLoading, updated, passworderror } = this.state;

    if (error) {
      return (
        <div>
          <h1 className="text-center my-5">Reset Password</h1>
          <div style={loading}>
            <h4 className="text-center">
              Problem resetting password. Please send another reset link.
            </h4>
            <div className="text-center">
              <Link to="/">Go Home</Link>
            </div>
            <br />
            <div className="text-center">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <h1 className="text-center my-5">Reset Password</h1>
          <div style={loading} className="text-center">
            <p style={{ color: "red" }}>
              Password reset link is invalid or has expired. <br />
              Please send another password reset link here:{" "}
              <Link to="/forgotpassword">Forgot Password?</Link>
            </p>
          </div>
        </div>
      );
    }
    return (
      <Fragment>
        <Style>
          <div className="outer-container">
            <div className="container">
              <h1 className="text-center my-5">Reset Password</h1>
              <form className="password-form" onSubmit={this.updatePassword}>
                <TextField
                  id="password"
                  label="password"
                  onChange={this.handleChange("password")}
                  value={password}
                  type="password"
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button class="btn btn-success btn-block">
                  Update Password
                </button>
                <div>
                  Already know your password? <Link to="/login">Login</Link>
                </div>
              </form>
              {updated && (
                <div style={{ color: "green" }}>
                  <p>
                    Your password has been successfully reset, <br /> please try
                    logging in again.
                    <Link to="/login">Login</Link>
                  </p>
                </div>
              )}
              {passworderror && (
                <div style={{ width: 340 }}>
                  <p style={{ color: "red" }}>{passworderror}</p>
                </div>
              )}
            </div>
          </div>
        </Style>
        <Footer></Footer>
      </Fragment>
    );
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};
