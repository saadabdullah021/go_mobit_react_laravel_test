import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [cell, setCell] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);
  const [age, setAge] = useState(Number);
  const [age_error, age_setError] = useState(null);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const ageChecker = (e) => {
    if ((e.target.value >= 18) & (e.target.value <= 60)) {
      age_setError("");
    } else {
      age_setError("Enter age between 18 & 60");
    }
    setAge(e.target.value);
  };
  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Please enter valid email.");
    } else {
      setError(null);
    }
    setEmail(event.target.value);
  };

  const AddUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("cell", cell);
    formData.append("age", age);
    formData.append("email", email);
    await axios
      .post("http://127.0.0.1:8000/api/AddUser", formData)
      .then(({ data }) => {
        setAge("");
        setEmail("");
        setName("");
        setCell("");
      });
    alert("USER ADDED SUCCESSFULLY");
    navigate("/viewusers");
  };

  const notify = () => toast("User Added Successfully.");
  return (
    <div className="add_user_main_wrapper">
      <div className="add_user_header_wrapper">
        <h2 style={{ textAlign: "center", color: "grey" }}>ADD STUDENT FORM</h2>
      </div>
      <div className="add_user_main_wrapper">
        <form onSubmit={AddUser}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name :
            </label>
            <div className="col-sm-10 col-md-6 ">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your Name "
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email :
            </label>
            <div className="col-sm-10 col-md-6">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your Email "
                required={true}
              />

              {error && <span style={{ color: "red" }}>{error}</span>}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="Cell" className="col-sm-2 col-form-label">
              Phone # :
            </label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                className="form-control"
                id="Cell "
                placeholder="Enter your Phone #   "
                required={true}
                value={cell}
                onChange={(e) => setCell(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Age :
            </label>
            <div className="col-sm-10 col-md-6">
              <input
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter your age "
                required={true}
                onChange={ageChecker}
                value={age}
              />
              {age_error && <span style={{ color: "red" }}>{age_error}</span>}
            </div>
          </div>

          <div class="col">
            <button type="submit" className="btn btn-primary" onClick={notify}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
