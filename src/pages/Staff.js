import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderItem from '../components/OrderItem'
import { orderContext } from "../Context/order"
import "../stylesheet/Staff.css"

export default function Staff() {
  const navigate = useNavigate()
  const orderState = useContext(orderContext)

  const { getTodaysOrder, todayOrders } = orderState

  useState(() => {
    getTodaysOrder()
  }, [])
  let userType = sessionStorage.getItem("login")

  function handleStaffLogout() {
    const tableNo = sessionStorage.getItem('tableno')
    sessionStorage.removeItem("login")
    if(tableNo) navigate(`/${tableNo}`)
    else navigate(`/`)
  }

  const myStyle={
     textAlign: 'center',
     marginTop: "100px" 
  }

  return (
    <div className='staff-container'>
      {todayOrders.length!==0?<>
      {userType === "staff" || userType === "manager" ?
        <>
          {todayOrders && todayOrders.map(order => {
            if (!order.delivered) return <OrderItem key={order._id} order={order} />
            else return null

          })}
          {todayOrders && todayOrders.map(order => {
            if (order.delivered) return <OrderItem key={order._id} order={order} />
            else return null
          })}
          <button className='staffLogoutBtn' onClick={handleStaffLogout}>Logout</button>
        </> :
        <h2 style={myStyle}>Only for Staff members</h2>
      }</>:
      <h2 style={myStyle}>No orders till now</h2>
    }
    </div>
  )
}
