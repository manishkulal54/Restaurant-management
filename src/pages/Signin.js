import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import "../stylesheet/Signup.css";

export default function Signin() {
  const navigate=useNavigate()
  // const url = "http://localhost:3001"
    const url = "https://proud-tick-life-jacket.cyclic.cloud"

  const [userType, setUserType] = useState('');
  const [errorMessage,setErrorMessage]=useState("")
  const [data, setData] = useState({
    email: "",
    pass: "",
    });
    const [signinText,setSigninText]=useState("Login")

  function handleOnChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }


  
  function userSignup(data) {
    let tableNo=sessionStorage.getItem("tableno")
    axios({
      url: url + "/api/user/loginuser",
      method: "POST",
      data
    })
      .then(data => {
        if (data.data.status === "error") {
          displayErrorMsg(data.data.message)
          setSigninText("Login")
        }
        else {
          sessionStorage.setItem("auth-token", data.data.message)
          if(!tableNo) return navigate('/')
          else navigate(`/${tableNo}`)
        }
      })
      .catch(err => console.error(err))
  }
  function staffSignup(data) {
    axios({
      url: url + "/api/user/loginstaff",
      method: "POST",
      data
    })
      .then(data => {
        if (data.data.status === "error") {
          displayErrorMsg(data.data.message)
          setSigninText("Login")
        }
        else {
          sessionStorage.setItem("login","staff")
          navigate(`/staff`)
        }
      })
      .catch(err => console.error(err))
  }
  function managerSignup(data) {
    axios({
      url: url + "/api/user/loginmanager",
      method: "POST",
      data
    })
    .then(data => {
      if (data.data.status === "error") {
        displayErrorMsg(data.data.message)
        setSigninText("Login")
        }
        else {
          sessionStorage.setItem("login","manager")
          navigate(`/staff`)
        }
      })
      .catch(err => console.error(err))
  }

  function signin(e){
    setSigninText("Logging in.....")
    e.preventDefault()
    if(data.email==="" || data.pass===""){
      displayErrorMsg("Fill all the fields")
      setSigninText("Login")
      return
    }
    if(userType==="user"){
      userSignup({
        email:data.email,
        password:data.pass
      })
    }
    else if(userType==="staff"){
      staffSignup({
        email:data.email,
        password:data.pass
      })
    }
    else if(userType==="manager"){
      managerSignup({
        email:data.email,
        password:data.pass
      })
    }else{
      displayErrorMsg("Select the user type")
      return setSigninText("Login")
    }
    setSigninText("Logged in")
  }

function displayErrorMsg(msg){
  setErrorMessage(msg)
  setTimeout(() => {
    setErrorMessage("")
  }, 3000);
}


  return (
    <div className="signup-container">
      <div className="subContainer">
        <h1>Login</h1>
        <div>
          <label htmlFor="userType">Select user type </label>
          <select
            name="userType"
            id="userType"
            value={userType}
            onChange={(e) => {
              setUserType(e.target.value);
            }}
          >
            <option value="" disabled></option>
            <option value="user">User</option>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email Address"
          onChange={handleOnChange}
          value={data.email}
          autoComplete="off"
        />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="Password"
          onChange={handleOnChange}
          value={data.pass}
        />
        <p style={{color:"red"}}>{errorMessage}</p>
        <button onClick={signin}>{signinText}</button>

          <a href="/signup">I don't have an account</a>

      </div>
    </div>
  );
}
