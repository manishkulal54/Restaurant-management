import React, { useEffect,useContext } from 'react'
import {orderContext} from '../Context/order'

export default function FoodOrderDetails() {
  const orderState=useContext(orderContext)
  const {foodOrder,fetchFoodOrder}=orderState

  useEffect(()=>{
    fetchFoodOrder()
    // eslint-disable-next-line
  },[])
  
  return (
    <div className='foodOrderContainer'>
        {
          Object.keys(foodOrder).map((foodName,i)=>{
            return (
            <div className="detailBox" key={i}>
            <p>{foodName}</p>
            <p>{foodOrder[foodName]}</p>
        </div>
        )
          })
        }
    </div>
  )
}
