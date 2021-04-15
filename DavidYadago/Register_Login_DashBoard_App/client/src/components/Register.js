import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    businessno: "",
    businessphone: "",
    businessstate: "",
    businesscity: "",
    businessaddress: "",
    businesspostcode: "",
  });

  const {
    email,
    password,
    name,
    businessno,
    businessphone,
    businessstate,
    businesscity,
    businessaddress,
    businesspostcode,
  } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        password,
        name,
        businessno,
        businessphone,
        businessstate,
        businesscity,
        businessaddress,
        businesspostcode,
      };
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
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Business Name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="number"
          name="businessno"
          value={businessno}
          placeholder="Business No"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="number"
          name="businessphone"
          value={businessphone}
          placeholder="Business Phone"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="businessstate"
          value={businessstate}
          placeholder="Business State"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="businesscity"
          value={businesscity}
          placeholder="Business City"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="businessaddress"
          value={businessaddress}
          placeholder="Business Address"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="number"
          name="businesspostcode"
          value={businesspostcode}
          placeholder="Business Postcode"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Sign Up</button>
      </form>
      <Link to="/login">login</Link>
    </Fragment>
  );
};

export default Register;
