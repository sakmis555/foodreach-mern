import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SignUp() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // synthetic event- padhna hai

    const response = await fetch("http://localhost:4000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 bg-dark.bg-gradient">
            <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0">
              <form onSubmit={handleSubmit}>
                <div className="text-center mt-5 font-weight-bolder">
                  <h1>SIGNUP</h1>
                </div>
                <div className="text-center mt-2">
                  Please enter your credentials
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-white"
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control bg-white"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-white"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputLocation" className="form-label">
                    Address
                  </label>

                  <input
                    type="text"
                    className="form-control bg-white"
                    name="geolocation"
                    value={credentials.geolocation}
                    onChange={onChange}
                  />
                </div>
                <button type="submit" className="m-3 btn btn-success">
                  Submit
                </button>
                <Link to="/login" className="m-3 btn btn-danger">
                  Already a user
                </Link>
              </form>
            </div>
          </div>

          <div className="rounded col-sm-6 px-0 d-none d-sm-block">
            <img
              src="https://media.istockphoto.com/id/811268074/photo/laptop-computer-desktop-pc-human-hand-office-soft-focus-picture-vintage-concept.jpg?s=612x612&w=0&k=20&c=-SZ1qYCD0XL30VA0SIjhsUksmMzoNv2vAeEzL0e7WIc="
              alt="Login"
              className="w-100 vh-100"
            />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
