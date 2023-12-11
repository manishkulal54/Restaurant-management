import React, { useState, useContext, useEffect } from "react";
import { usercontext } from "../Context/user";

export default function Staffs() {
  const userCntxt = useContext(usercontext);
  const { fetchAllStaffs, staffs, deleteStaff, createStaff, createManager } =
    userCntxt;
  const adminToken=sessionStorage.getItem("admintoken")
  useEffect(() => {
    fetchAllStaffs(adminToken);
    // eslint-disable-next-line
  }, []);
  const [staffData, setStaffData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    pass: "",
    cpass: "",
  });
  const [addStaffVisibility, setAddStaffVisibility] = useState(false);

  function handleOnchange(e) {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  }
  function registerUser() {
    if (staffData.type === "staff") {
      createStaff({
        name: staffData.name,
        phone: staffData.phone,
        email: staffData.email,
        password: staffData.pass,
        managerEmail: "admin",
        managerPass: "pass",
      });
    } else {
      createManager({
        name: staffData.name,
        phone: staffData.phone,
        email: staffData.email,
        password: staffData.pass,
        managerEmail: "admin",
        managerPass: "pass",
      });
    }
    setAddStaffVisibility(false);
    setStaffData({
      name: "",
      email: "",
      phone: "",
      type: "",
      pass: "",
      cpass: "",
    });
  }


  function timeConverter(date) {
    const dateTime = new Date(date);
    const formattedTime = dateTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata'
    })
    const formattedDate = dateTime.toLocaleDateString('en-IN', {
        day: '2-digit',
        month:'2-digit',
        year:'numeric'
    })
    return {formattedTime,formattedDate}
  }

  return (
    <div className="adminUsers">
      <div>
        <div className="title">
          <p style={{ padding: "10px" }}>
            <span>SLNO</span>
            <span>User name</span>
            <span>Email</span>
            <span>Phone number</span>
            <span>Type of staff</span>
            <span>Order date and time</span>
            <span>Delete</span>
          </p>
        </div>

        {staffs.length !== 0 &&
          staffs.map((staff, i) => {
            return (
              <div className="user-box" key={staff._id}>
                <p>
                  <span>{i + 1}</span>
                  <span>{staff.name}</span>
                  <span>{staff.email}</span> <span>{staff.phone}</span>{" "}
                  <span>{staff.type}</span>{" "}
                  <span>{`${timeConverter(staff.date).formattedDate}---${timeConverter(staff.date).formattedTime}`}</span>
                  <button
                    onClick={() => {
                      let confirm = window.confirm(
                        "Do you really want to delete"
                      );
                      if (confirm) return deleteStaff(staff._id);
                    }}
                  >
                    Delete &nbsp;
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </button>
                </p>
              </div>
            );
          })}
      </div>
      <button
        className="addStaffBtn"
        onClick={() => {
          if (addStaffVisibility) setAddStaffVisibility(false);
          else setAddStaffVisibility(true);
        }}
      >
        {addStaffVisibility ? "close" : "Add staff"}
      </button>
      <div
        className="addStaff"
        style={{ display: addStaffVisibility ? "flex" : "none" }}
      >
        <h2>Add Staff</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleOnchange}
          value={staffData.name}
          autoComplete="off"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleOnchange}
          value={staffData.email}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="phone"
          name="phone"
          onChange={handleOnchange}
          value={staffData.phone}
          autoComplete="off"
        />
        <select
          name="type"
          value={staffData.type}
          onChange={handleOnchange}
          id=""
        >
          <option value="" disabled>
            Select user type
          </option>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
        </select>
        <input
          type="password"
          placeholder="password"
          name="pass"
          onChange={handleOnchange}
          value={staffData.pass}
        />
        <input
          type="password"
          placeholder="Confirm passoword"
          name="cpass"
          onChange={handleOnchange}
          value={staffData.cpass}
        />
        <button onClick={registerUser}>Register</button>
      </div>
    </div>
  );
}
