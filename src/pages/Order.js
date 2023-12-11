import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../stylesheet/Order.css";
import { useParams } from 'react-router-dom'

import { foodContext } from '../Context/food'
import { orderContext } from "../Context/order";

export default function Order() {
  const navigate = useNavigate()
  let { id } = useParams()

  const foodState = useContext(foodContext)
  const orderState = useContext(orderContext)

  const { singleFood, fetchSingleFood } = foodState
  const { createOrder } = orderState
  let tableNo = sessionStorage.getItem("tableno")
  let authToken = sessionStorage.getItem("auth-token")

  useEffect(() => {
    fetchSingleFood(id,authToken)
    // eslint-disable-next-line 
  }, [])

  const [quantity, setQuantity] = useState('')


  function placeOrder() {
    if (!authToken) return alert("Login to order")
    if (quantity === 0 || quantity === "") return alert("Select the quantity ")
    if(!tableNo) tableNo = prompt("Enter your Table Number")
    if (tableNo) {
      sessionStorage.setItem("tableno",tableNo)
      createOrder(authToken, singleFood.name,singleFood.price, tableNo, quantity,singleFood.image)
    }
    alert("Order placed")
  }


  return (
    singleFood.lenght !== 0 &&
    <div className="order-container">
      <div className="food-details">
        <p>
          {singleFood.name}
        </p>
        <img src={singleFood.image} alt="" />
        <div className="description">
          <p>{singleFood.description}
          </p>
          <ul>
            <li>
              Diet : <span>{singleFood?.foodType?.diet}</span>
            </li>
            <li>
              Temperature : <span>{singleFood?.foodType?.temperature}</span>
            </li>
          </ul>
          <strong>
            Price : &#8377;<span>{singleFood.price}</span>
          </strong>
        </div>
      </div>
      <div className="order-details">
        <p>Place Your Order</p>
        <input type="number" placeholder="Quantity" min="1" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
        <p>
          Total Price : &#8377;<span>{!quantity ? "0" : parseFloat(singleFood.price) * parseFloat(quantity)}</span>
        </p>
        <button onClick={placeOrder}>Place Order</button>
      </div>

      <button className="back-btn" onClick={() => {
        if (tableNo) return navigate(`/${tableNo}`)
        else return navigate("/")
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="black"
          className="bi bi-arrow-left-square-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
        </svg>
        Go Back
      </button>
    </div>
  );
}
