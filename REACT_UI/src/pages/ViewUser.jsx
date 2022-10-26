import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../pages/Loader";

const ViewUser = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [names, setnames] = useState([]);
  const [dropdownvalue, setDropDownValue] = useState(0);

  const selectVal = (e) => {
    setDropDownValue(e.target.value);
  };

  const api_call = () => {
    axios
      .get("http://127.0.0.1:8000/api/GetUsers/")
      .then((data) => {
        setUser(data.data.data);

        setnames(data.data.data);
      })
      .catch((e) => {
        alert("ERROR IN FETCHING THE API");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    api_call();
  }, []);

  let usernames =
    names.length > 0 &&
    names.map((item, i) => {
      return (
        <option key={item.create_at} value={item.id}>
          {item.name}
        </option>
      );
    }, this);
  function searchUser(mid) {
    axios
      .get(`http://127.0.0.1:8000/api/GetUsers/${mid}`)
      .then((data) => {
        if (dropdownvalue == 0) {
          setIsLoading(true);
          axios
            .get("http://127.0.0.1:8000/api/GetUsers/")
            .then((data) => {
              setUser(data.data.data);
            })
            .catch((e) => {})
            .finally(() => setIsLoading(false));
        } else {
          let id = data.data.data.id;
          let name = data.data.data.name;
          let email = data.data.data.email;
          let cell = data.data.data.cell;
          let age = data.data.data.age;
          let created_at = data.data.data.created_at;
          let Arr = [];
          Arr.push({
            id: id,
            name: name,
            email: email,
            cell: cell,
            created_at: created_at,
            age: age,
          });
          if (dropdownvalue != 0) {
            setUser(Arr);
          }
        }
      })
      .catch((e) => {
        alert("ERROR IN FETCHING THE API" + e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  const renderUser = (
    <div className="userlist-container">
      <div className="row">
        <div className="col-md-4">
          <span style={{ textAlign: "right" }}>Search User</span>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            id="dropdown"
            value={dropdownvalue}
            onChange={selectVal}
          >
            <option value={0}>ALL</option>
            {usernames}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="button"
            className="btn btn-primary"
            onClick={() => searchUser(dropdownvalue)}
            value="Search User"
          />
        </div>
      </div>
      <div>
        <h3 style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
          USER LISTING
        </h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Cell No </th>
            <th>Created At</th>
            <th>isDeleted</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, index) => (
            <tr>
              <td key={index}>{item.id}</td>
              <td key={index}>{item.name}</td>
              <td key={index}>{item.email}</td>
              <td key={index}>{item.cell}</td>
              <td key={index}>{item.created_at}</td>
              <td key={index}>
                <input type="checkbox" className="form-check-input" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return <>{isLoading ? <Loader /> : renderUser}</>;
};

export default ViewUser;
