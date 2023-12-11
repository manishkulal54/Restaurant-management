import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function UserOrderData(props) {
    const navigate=useNavigate()
    const {order,i,deleteOrder,update}=props
    const [isChecked,setIsChecked]=useState(order.delivered)
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
      function handleChange(){
        setIsChecked(!isChecked)
        update(props.order._id,{delivered:!isChecked})
    }
    return (
        <div className="order-box" key={order._id}>
            <span><strong>SLNO : </strong> {i + 1}</span>
            <img src={order.image} alt="" onClick={()=>{navigate(`/order/${order.foodId}`)}} />
            <span className="productName">
                <strong>Product Name : </strong>&nbsp;
                {order.foodName}
            </span>
            <span><strong>Quantity : </strong>&nbsp; {order.quantity}</span>
            <span><strong>price : </strong>&nbsp; {order.price*order.quantity}</span>
            <span><strong>Timestamp : </strong> &nbsp;{ ` ${timeConverter(order.date).formattedTime}`}</span>
            <div>
                <button onClick={() => { deleteOrder(order._id, "user") }}>Delete</button>
                <input type="checkbox" name="" id="" defaultChecked={isChecked} onChange={handleChange} />
            </div>
        </div>
    )
}
