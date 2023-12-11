import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheet/Navbar.css";

import logo from "../Images/logo.png";

export default function Navbar() {
  const[hamburgerBtn,setHamburgerBtn]=useState(false)
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            onClick={() => {
              let tableno = sessionStorage.getItem("tableno");
              if(tableno) navigate(`/${tableno}`);
              else navigate(`/`);
            }}
          />
          <h2>LOGO</h2>
        </div>
        <div className="navButtons">
          {
            sessionStorage.getItem("auth-token")?<button onClick={()=>{
              sessionStorage.removeItem("auth-token")
              navigate("/signin")
            }}>
              Logout
            </button>:<button
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </button>
          }
          <button onClick={() => navigate("/orders")}>
            Orders &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart2"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          </button>
          
          <button
                onClick={() => {
                  navigate("/staff");
                }}
              >
                Staff
              </button>
        </div>
        <div className="hamContainer">
          <div className="hamburger" onClick={()=>setHamburgerBtn(!hamburgerBtn)}>
            <span className={hamburgerBtn ? "span1" :""}></span>
            <span className={hamburgerBtn ? "span2" :""}></span>
            <span className={hamburgerBtn ? "span3" :""}></span>
          </div>
            <div className="hamNavButtons" style={{display:hamburgerBtn?"flex":"none"}}>
            {
            sessionStorage.getItem("auth-token")?<button onClick={()=>{
              sessionStorage.removeItem("auth-token")
              navigate("/signin")
            }}>
              Logout
            </button>:<button
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </button>
          }
              <button onClick={() => navigate("/orders")}>
                Orders
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart2"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  navigate("/staff");
                }}
              >
                Staff
              </button>
            </div>
        </div>
      </nav>
    </>
  );
}
