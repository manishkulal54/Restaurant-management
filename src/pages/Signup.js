import React, { useState} from "react";
import "../stylesheet/Signup.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  // const url = "http://localhost:3001"
  const url = "https://proud-tick-life-jacket.cyclic.cloud"

  const [userType, setUserType] = useState("user");
  const [errorMessage, setErrorMessage] = useState("")
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    pass: "",
    cpass: "",
    managerEmail: "",
    managerPass: "",
  });
  const [signupText,setSignuptext]=useState("Register")

  function handleOnChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function userSignup(data) {
    axios({
      url: url + "/api/user/createuser",
      method: "POST",
      data
    })
      .then(data => {
        if (data.data.status === "error") {
          displayErrorMsg(data.data.message)
          setSignuptext("Register")
        }
        else {
          sessionStorage.setItem("auth-token", data.data.message)
          let tableno=sessionStorage.getItem("tableno")
          if(tableno) navigate(`/${tableno}`)
          else navigate(`/`)
        }
      })
      .catch(err => console.error(err))
    }
    function staffSignup(data) {
    axios({
      url: url + "/api/user/createstaff",
      method: "post",
      data
    })
    .then(data => {
      if (data.data.status === "error") {
        displayErrorMsg(data.data.message)
        setSignuptext("Register")
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
      url: url + "/api/user/createmanager",
      method: "post",
      data
    })
      .then(data => {
        if (data.data.status === "error") {
          displayErrorMsg(data.data.message)
          setSignuptext("Register")
        }
        else {
          sessionStorage.setItem("login","staff")
          navigate(`/staff`)
        }
      })
      .catch(err => console.error(err))
  }

  function validator() {
    const { name, phone, email, pass, cpass} = data
    const emailRegex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (name === "" || phone === "" || email === "" || pass === "" || cpass === "") {
      displayErrorMsg("Fill all the fields")
      return false
    }
    if (data.pass !== data.cpass) {
      displayErrorMsg("Password is not matching")
      return false
    }
    if (data.phone.length !== 10) {
      displayErrorMsg("Invalid phone number")
      return false
    }
    if (data.pass.length < 6) {
      displayErrorMsg("password must contain greater than 6 characters")
      return false
    }
    if(!emailRegex.test(email)){
      displayErrorMsg("invalid email")
      return false
    }
    if (userType === "staff" || userType === "manager") {
      if (data.managerEmail === "" || data.managerPass === "") {
        displayErrorMsg("Fill all the fields")
        return false
      }
      if (data.managerPass === "" || data.managerPass === "") {
        displayErrorMsg("Fill all the fields")
        return false
      }
    }
    return true
  }

  function signup(e) {
    e.preventDefault()
    setSignuptext("Registering...")
    if(!validator()) {
      setSignuptext("Register")
      return
    }
    if (userType === "user") {
      userSignup({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.pass
      })
    }
    if (userType === "staff") {
      staffSignup({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.pass,
        managerEmail: data.managerEmail,
        managerPass: data.managerPass
      })
    }
    if (userType === "manager") {
      managerSignup({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.pass,
        managerEmail: data.managerEmail,
        managerPass: data.managerPass
      })
    }
    setSignuptext("Registered")
  }


  
function displayErrorMsg(msg){
  setErrorMessage(msg)
  setTimeout(() => {
    setErrorMessage("")
  }, 4000);
}


  return (
    <div className="signup-container">
      <div className="subContainer">
        <h1>Register</h1>
        <div>
          <label htmlFor="userType">Select user type </label>
          <select
            name="userType"
            id="userType"
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
          name="name"
          id="name"
          placeholder="Name"
          onChange={handleOnChange}
          value={data.name}
          autoComplete="off"
        />
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone number"
          onChange={handleOnChange}
          value={data.phone}
          autoComplete="off"
        />
        <input
          type="email"
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
        <input
          type="password"
          name="cpass"
          id="cpass"
          placeholder="Confirm your password"
          onChange={handleOnChange}
          value={data.cpass}
        />
        <div style={{ display: `${userType === "user" ? "none" : ""}` }}>
          <input
            type="text"
            name="managerEmail"
            id="mEmail"
            placeholder="Manager Email Address"
            onChange={handleOnChange}
            value={data.managerEmail}
          autoComplete="off"
          />
          <input
            type="password"
            name="managerPass"
            id="mPass"
            placeholder="Manger Password"
            onChange={handleOnChange}
            value={data.managerPass}
          />
        </div>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button onClick={signup}>{signupText}</button>
          <a href="/signin">Already have an account</a>
      </div>
    </div>
  );
}
