import React, { useEffect, useContext } from 'react'
import { orderContext } from '../Context/order'
export default function Orders() {

    const orderState = useContext(orderContext)
    const { orders, fetchAllOrders, deleteOrder } = orderState
    const adminToken=sessionStorage.getItem("admintoken")
    useEffect(() => {
        fetchAllOrders(adminToken)
        // eslint-disable-next-line
    }, [])

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
            month: '2-digit',
            year: 'numeric'
        })
        return { formattedTime, formattedDate }
    }
    return (
        <div className="adminUsers">
            {orders.length!==0?
            <div>
                <div className='title'>
                    <p style={{ padding: "10px" }}>
                        <span>SLNO</span>
                        <span>Product name</span>
                        <span>Quantity</span>
                        <span>Price/one</span>
                        <span>Order date and time</span>
                        <span>Delete</span>
                    </p>
                </div>
                {orders.map((order, i) => {
                    return (

                        <div className="user-box" key={order._id}>
                            <p>
                                <span>{i + 1}</span>
                                <span className='productName'>{order.foodName}</span>
                                <span>{order.quantity}</span>
                                <span>{order.price}</span>
                                <span>{`${timeConverter(order.date).formattedDate}--${timeConverter(order.date).formattedTime}`}</span>
                                <button onClick={() => {
                                    deleteOrder(order._id, "admin")
                                }}>
                                    Delete
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
                        </div>
                    )
                })}
            </div>:
        <h2 style={{color:"black"}}>No Orders</h2>}
        </div>
    )
}
