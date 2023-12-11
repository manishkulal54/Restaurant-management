import React,{useEffect,useContext} from "react";
import { usercontext } from "../Context/user";

export default function Users() {
const userCntxt=useContext(usercontext)
    const {fetchAllUser,users,deleteUser} = userCntxt
    const adminToken=sessionStorage.getItem('admintoken')
    useEffect(()=>{
      fetchAllUser(adminToken)
    // eslint-disable-next-line
    },[])

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
      <div className='title'>
                    <p style={{padding:"10px"}}>
                        <span>SLNO</span>
                        <span>User name</span>
                        <span>Email</span>
                        <span>Phone number</span>
                        <span>Registerd date</span>
                        <span>Delete</span>
                    </p>
                </div>
                {/* !from here */}
                {users.map((user,i)=>{
                  return (
                  <div className="user-box" key={user._id}>
                    <p>
                      <span>{i+1}</span>
                      <span>{user.name}</span>
                      <span>{user.email}</span> <span>{user.phone}</span>
                      <span>{`${timeConverter(user.date).formattedDate}---${timeConverter(user.date).formattedTime}`}</span>
                      <button onClick={()=>{
                        let confirm=window.confirm("Do you really want to delete")
                        if(confirm) return deleteUser(user._id,adminToken)}
                      }>
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
                  </div>)
                })}


      </div>
    </div>
  );
}
