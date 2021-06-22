import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import Footer from "./Navbar/Footer";
var CryptoJS = require("crypto-js");
const Style = styled.div`
  .container {
    border-radius: 5px;
    background-color: #fdfdfd;
    padding: 20px;
  }
  .head {
    text-align: center;
    padding-top: 20px;
  }
  .outer-container {
    padding-top: 65px;
    padding-bottom: 30px;
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
  .login-form {
    width: 440px;
    margin: 50px auto;
    font-size: 15px;
  }
`;
const Register = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    company: "",
    address: "",
  });

  const { email, password, name, company, address } = inputs;

  const [validationError, setvalidationError] = useState("");

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name, company, address };
      const response = await fetch(
        "http://localhost:5000/authentication/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
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
        toast.success("Register Successfully");
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
            <br />
            <h2 className="title">Subscribe</h2>

            <form onSubmit={onSubmitForm} className="login-form">
              <hr />{" "}
              <div className="form-group">
                <label htmlFor="inputName">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="inputName"
                  placeholder="John Smith, Jane Doe"
                  defaultValue={name}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    defaultValue={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                    defaultValue={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputCompany">Company</label>
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  id="inputCompany"
                  placeholder="Woolworths, Coles..."
                  defaultValue={company}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  id="inputAddress"
                  placeholder="123 Fake Street"
                  defaultValue={address}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button
                className="btn btn-success btn-block"
                style={{ background: "#092b47" }}
              >
                Subscribe Today
              </button>
              <div>
                Already have an account? <Link to="/login">Sign In</Link>
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
export default Register;
