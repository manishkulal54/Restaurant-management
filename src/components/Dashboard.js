import React,{useContext,useEffect} from "react";
import {usercontext} from "../Context/user"
import {orderContext} from "../Context/order"

export default function Dashboard() {
  const userCntxt=useContext(usercontext)
  const orderState=useContext(orderContext)


  const {users,fetchAllUser,fetchAllStaffs,staffCount,managerCount,getManagerCount,getStaffCount} =userCntxt
  const {orders,fetchAllOrders,profitCalculator,earning}=orderState

  
  useEffect(()=>{
    const adminToken=sessionStorage.getItem("admintoken")
    fetchAllOrders(adminToken)
    fetchAllStaffs(adminToken)
    fetchAllUser(adminToken)
    getManagerCount(adminToken)
    getStaffCount(adminToken)
    profitCalculator(adminToken)
    // eslint-disable-next-line
  },[])

 


  return (
    <div className="dashboard">
      <div>
        <div>
          <p>User visited </p><span>{users.length}</span>
        </div>
        <div>
          <p>Order recieved </p><span>{orders.length}</span>
        </div>
        <div>
          <p>Total Staffs </p><span>{staffCount}</span>
        </div>
        <div>
          <p>Total Managers </p><span>{managerCount}</span>
        </div>
      </div>
      <div>
        Total Earnings <span>{earning}</span>
      </div>
    </div>
  );
}
