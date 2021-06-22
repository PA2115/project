import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Navbar/Footer";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { parse } from "@fortawesome/fontawesome-svg-core";
const eye = <FontAwesomeIcon icon={faEye} />;
var CryptoJS = require("crypto-js");

const Style = styled.div`
  .pass-wrapper {
    position: relative;
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
    border-radius: 5px;
    background-color: #fdfdfd;
    padding: -20px;
  }
  .head {
    text-align: center;
    padding-top: 20px;
  }
  .outer-container {
    padding-top: 65px;

    background-color: #2b5169;
    overflow: hidden;
  }
  .container {
    width: auto;
    height: auto;
  }
  h1 {
    color: #000000;
    font-family: Helvetica, "Open Sans", Arial, sans-serif;
    font-size: 28px;
    font-weight: bold;
  }
`;

const Login = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [validationError, setvalidationError] = useState("");

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();
      console.log("login?:" + parseRes);
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        //
        //Grab User Object, encrypt userole and store in local storage
        const res = await fetch("http://localhost:5000/roles", {
          method: "POST",
          headers: { jwt_token: localStorage.token },
        });

        const parseData = await res.json();
        //Encrypt
        var ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(parseData.user_role),
          "345214612"
        ).toString();
        //Set encrypted userrole to localstorage to be decrypted and used for roles checking
        localStorage.setItem("Urr", ciphertext);
        props.history.push("/dashboard");
        toast.success("Logged in Successfully");
      } else {
        setvalidationError(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Style>
        <div className="outer-container">
          <div className="container">
            <h2 className="title">Login</h2>

            <form onSubmit={onSubmitForm} className="login-form">
              <hr />{" "}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>
              <div className="form-group">
                <div className="pass-wrapper">
                  <label htmlFor="password">Password:</label>
                  <input
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                    placeholder="Enter Password"
                    type={passwordShown ? "text" : "password"}
                  />

                  <i onClick={togglePasswordVisiblity}>{eye}</i>
                </div>
                <div>
                  <Link to="/forgotpassword">Forgot Password?</Link>
                </div>
              </div>
              <button class="btn btn-success btn-block">Submit</button>
              <div>
                Don't have an account? <Link to="/register">Signup </Link>
              </div>
            </form>
            {validationError && (
              <div style={{ width: 340 }}>
                <p style={{ color: "red" }}>{validationError}</p>
              </div>
            )}
          </div>
        </div>
      </Style>
      <Footer></Footer>
    </Fragment>
  );
};
export default Login;
