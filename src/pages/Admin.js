import React, { useEffect, useState } from "react";
import "../stylesheet/Admin.css";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Titlebar from "../components/Titlebar";
import Users from "../components/Users";
import Staffs from "../components/Staffs";
import Orders from "../components/Orders";
import Foods from "../components/Foods";
import Addadmin from "../components/Addadmin";
import FoodOrderDetails from "../components/FoodOrderDetails";

export default function Admin() {
  let { page } = useParams();
  // const url = "http://localhost:3001"
  const url = "https://proud-tick-life-jacket.cyclic.cloud"
  const [componenet, setComponent] = useState(<Dashboard />);
  const [adminData, setAdminData] = useState({
    username: "",
    pass: "",
  });
  const [isadmin,setIsAdmin]=useState(false)

  useEffect(() => {
    handleComponent(page);
    if(sessionStorage.getItem("admintoken")){
      setIsAdmin(true)
    }
  }, [page]);

  function handleComponent(page) {
    if (page === "dashboard") setComponent(<Dashboard />);
    if (page === "users") setComponent(<Users />);
    if (page === "staffs") setComponent(<Staffs />);
    if (page === "orders") setComponent(<Orders />);
    if (page === "foods") setComponent(<Foods />);
    if (page === "createAdmin") setComponent(<Addadmin/>);
    if (page === "foodOrder") setComponent(<FoodOrderDetails/>);
  }
  function handleChnage(e) {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  }
  async function adminLogin(){
    try {
      const response=await fetch(`${url}/api/admin/login`,{
        headers:{
          "Content-type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({
          name:adminData.username,
          password:adminData.pass
        })
      })
      const data=await response.json()
      if(data.status!=="error"){
        setIsAdmin(true)
        console.log(data.message);
      sessionStorage.setItem('admintoken',data.message)
      }
      else alert(data.message) 
    } catch (error) {
      console.log({error});
    }
  }

  return (
    <div className="admin-container">
      <div className="adminLogin" style={{ display: isadmin?"none":"flex" }}>
        <div>
          <h2>Admin login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={adminData.username}
            onChange={handleChnage}
          autoComplete="off"
          />
          <input
            type="password"
            name="pass"
            id=""
            placeholder="password"
            value={adminData.pass}
            onChange={handleChnage}
          />
          <button onClick={adminLogin}>Login</button>
        </div>
      </div>

      <div className="adminHome-container" style={{display:isadmin?"flex":"none"}}>
        <Sidebar />
        <div className="adminHome">
          <Titlebar title={page || "dashboard"} />
          {componenet}
        </div>
      </div>
    </div>
  );
}
