import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../stylesheet/Item.css"

export default function Item(props){
  const {image,name,price}=props.food
  const navigate=useNavigate()
  return (
    <div className='item-box'>
      <img src={image} alt="" />
      <div>
        <p>{name}</p>
        <div>
          <p><span>&#8377;</span>{price}</p>
          <button onClick={()=>{navigate("/order/"+props.id)}}>Order</button>
        </div>
      </div>
    </div>
  )
}
