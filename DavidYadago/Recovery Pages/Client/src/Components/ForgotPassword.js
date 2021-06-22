/* eslint-disable no-console */
import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Footer from "./Navbar/Footer";
import styled from "styled-components";
import axios from "axios";

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

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
      showNullError: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
        showNullError: true,
      });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/forgotPassword",
          {
            email,
          }
        );

        if (response.data === "recovery email sent") {
          this.setState({
            showError: false,
            messageFromServer: "recovery email sent",
            showNullError: false,
          });
        }
      } catch (error) {
        if (error.response.data === "email not in db") {
          this.setState({
            showError: true,
            messageFromServer: "",
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;

    return (
      <Fragment>
        <Style>
          <div className="outer-container">
            <div className="container">
              <h1 className="text-center my-5">Forgot Password</h1>
              <form className="login-form" onSubmit={this.sendEmail}>
                <TextField
                  type="email"
                  name="email"
                  id="email"
                  label="email"
                  value={email}
                  onChange={this.handleChange("email")}
                  placeholder="Email Address"
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button class="btn btn-success btn-block">
                  Send Password Reset Email
                </button>
                <div>
                  Already know your password? <Link to="/login">Login</Link>
                </div>
              </form>
              {showNullError && (
                <div>
                  <p style={{ color: "red" }}>
                    The email address cannot be empty.
                  </p>
                </div>
              )}
              {showError && (
                <div>
                  <p style={{ color: "red" }}>
                    That email address isn't recognized. Please try again or
                    register for a new account.
                  </p>
                  <Link to="/register">Signup </Link>
                </div>
              )}
              {messageFromServer === "recovery email sent" && (
                <div style={{ color: "green" }}>
                  Password Reset Email Successfully Sent!
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

export default ForgotPassword;
