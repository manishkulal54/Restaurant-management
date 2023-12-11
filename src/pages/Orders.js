import React, { useContext, useEffect } from "react";
import "../stylesheet/Orders.css"
import { orderContext } from "../Context/order"
import UserOrderData from "../components/UserOrderData";


export default function Orders() {
  const orderCntxt = useContext(orderContext)
  const { fetchOrderByUserId, userOrder, deleteOrder, update } = orderCntxt

  useEffect(() => {
    let authToken = sessionStorage.getItem("auth-token")
    if (authToken) {
      fetchOrderByUserId(authToken)
    }
    // eslint-disable-next-line
  }, [])



  return (
    <div className="orders-conatainer">
      {userOrder.length !== 0 ? <>
        <h2>Your Orders</h2>
        {userOrder && userOrder.map((order, i) => {
          if (!order.delivered) return <UserOrderData key={order._id} order={order} i={i} deleteOrder={deleteOrder} update={update} />
          else return null
        })
        }
        {
          userOrder && userOrder.map((order, i) => {
            if (order.delivered) return <UserOrderData key={order._id} order={order} i={i} deleteOrder={deleteOrder} update={update} />
            else return null
          })
        }</> :
        <h2 style={{ textAlign: "center", marginTop: "100px" }}> No Orders</h2>
      }
    </div>
  );
}
