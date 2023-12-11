import React,{useState,useContext} from 'react'
import "../stylesheet/Staff.css"
import { orderContext } from '../Context/order'


export default function OrderItem(props) {
  const orderState=useContext(orderContext)
  const { update}=orderState
  const [isChecked,setIsChecked]=useState(Boolean(props.order.delivered))


  function timeConverter(date) {
    const dateTime = new Date(date);
    const formattedTime = dateTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
    return formattedTime
  }
  
  function handleChange(){
    setIsChecked(!isChecked)
    update(props.order._id,{delivered:!isChecked})
}

  return (
    <div className='order-item'>
      <img src={props.order.image} alt={props.order.name} />
      <div className='details'>
        <h3>{props.order.name}</h3>
        <div>
          <p><strong>Table Number : {props.order.tableNo}</strong> </p>
          <p> <strong>Quantity : {props.order.quantity} </strong></p>
        </div>
        <p><strong>Order Time : {timeConverter(props.order.date)}</strong></p>
        <div>
          <strong>delivered : &nbsp;</strong>
          <input type="checkbox" name="" id="" defaultChecked={isChecked} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}
