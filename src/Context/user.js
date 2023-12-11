import axios from 'axios';
// eslint-disable-next-line
import React, { useState, createContext } from 'react'

const usercontext = createContext()
export { usercontext };

export default function UserState(props) {
    const [users, setUsers] = useState([])
    const [staffs, setStaffs] = useState([])
    const [staffCount, setStaffCount] = useState(0)
    const [managerCount, setManagerCount] = useState(0)

    // const url = "http://localhost:3001"
    const url = "https://proud-tick-life-jacket.cyclic.cloud"

    async function createStaff(data) {
        axios({
            url: url + "/api/user/createstaff",
            method: "POST",
            data
        })
            .then(res => {
                if (res.data.status !== "error") {
                    setStaffs(staffs.concat(res.data.staff))
                }
            })
            .catch(err => console.error(err))
    }
    async function createManager(data) {
        axios({
            url: url + "/api/user/createmanager",
            method: "POST",
            data
        })
            .then(res => {
                if (res.data.status !== "error") {
                    setStaffs(staffs.concat(res.data.manager))
                }
            })
            .catch(err => console.error(err))
    }


    async function fetchAllUser(adminToken) {
        const data = await fetch(`${url}/api/user/fetchalluser`, {
            headers: {
                "admin-token": adminToken
            }
        })
        const response = await data.json()
        if (response.status !== "error") {
            setUsers(response.message)
        }
    }
    async function fetchAllStaffs(adminToken) {
        const data = await fetch(`${url}/api/user/fetchallstaffs`, {
            headers: {
                "admin-token": adminToken
            }
        })
        const response = await data.json()
        if (response.status !== "error") {
            setStaffs(response.message)
        }
    }


    async function deleteUser(id,adminToken) {
        const data = await fetch(`${url}/api/user/deleteuser/${id}`, {
            method: "delete",
            headers: {
                "admin-token": adminToken
            }
        })
        const response = await data.json()
        if (response.status === "error") {
            alert(response.message)
        } else {
            let newUser = users.filter(user => user._id !== id)
            setUsers(newUser)
        }
    }


    async function deleteStaff(id,adminToken) {
        const data = await fetch(`${url}/api/user/deletestaff/${id}`, {
            method: "delete",
            headers: {
                "admin-token": adminToken
            }

        })
        const response = await data.json()
        if (response.status === "error") {
            alert(response.message)
        } else {
            let newUser = staffs.filter(user => user._id !== id)
            setStaffs(newUser)
        }
    }

    async function getStaffCount(adminToken) {
        const response = await fetch(`${url}/api/user/getstaffcount`,{
            headers:{
                "admin-token":adminToken
            }
        })
        const data = await response.json()
        if (data.status !== "error") {
            setStaffCount(data.count)
        }
    }

    async function getManagerCount(adminToken) {
        const response = await fetch(`${url}/api/user/getmanagercount`,{
            headers:{
                "admin-token":adminToken
            }
        })
        const data = await response.json()
        if (data.status !== "error") {
            setManagerCount(data.count)
        }
    }


    return (
        <usercontext.Provider value={{
            users,
            staffs,
            fetchAllUser,
            fetchAllStaffs,
            deleteUser,
            deleteStaff,
            createStaff,
            createManager,
            getManagerCount,
            getStaffCount,
            staffCount,
            managerCount
        }}>
            {props.children}
        </usercontext.Provider>
    )
}
