import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [handleHam, setHandleHam] = useState(false)

  function handleLogout() {
    sessionStorage.removeItem("admintoken");
    let tableno = sessionStorage.getItem("tableno");
    if(tableno) return navigate(`/${tableno}`);
    else return navigate("/")
  }

  return (
  <>
    <div className="mobileHam">
      <div onClick={() => handleHam ? setHandleHam(false) : setHandleHam(true)}>
        <span className={handleHam ? "span1" : ""}></span>
        <span className={handleHam ? "span2" : ""}></span>
        <span className={handleHam ? "span3" : ""}></span>
      </div>
    </div>
    <div className="sidebar" style={{ display: handleHam ? "block" : "none"}}>
      <ul>
        <li>
          <a href="/admin/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/admin/users">Users</a>
        </li>
        <li>
          <a href="/admin/staffs">Staff</a>
        </li>
        <li>
          <a href="/admin/orders">Orders</a>
        </li>
        <li>
          <a href="/admin/foods">Food Items</a>
        </li>
        <li>
          <a href="/admin/foodOrder">Food Orders</a>
        </li>
        <li>
          <a href="/admin/createAdmin">Create Admin</a>
        </li>
        <li className="adminLogoutBtn" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  </>
  );
}
