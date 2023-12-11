import React, { useState, createContext } from 'react'
const orderContext = createContext()
export { orderContext }


export default function OrderState(props) {
    const [orders, setOrders] = useState([])
    const [userOrder, setUserOrder] = useState([])
    const [todayOrders, setTodaysOrders] = useState([])
    const [earning, setEarcning] = useState(0)
    const [foodOrder,setFoodOrder]=useState({})
    // const url = "http://localhost:3001"
    const url = "https://proud-tick-life-jacket.cyclic.cloud"

    async function createOrder(authToken, foodName,price,tableNo, quantity,image) {
        const response = await fetch(`${url}/api/order/create`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            },
            body: JSON.stringify({ authToken, foodName,price,tableNo, quantity ,image}), 
        });

        const data = await response.json();
        if (data.status !== "error") {
            setOrders(orders.concat(data.message));
        }
    }


    async function fetchAllOrders(adminToken) {
        const response = await fetch(`${url}/api/order/getallorders`,{
            headers:{
                "admin-token":adminToken
            }
        })
        const data = await response.json()
        if (data.status !== "error") {
            setOrders(data.message)
        }
    }

    async function fetchOrderByUserId(authToken) {
        const response = await fetch(`${url}/api/order/getallordersofuser`, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            },
            method: "get"
        })
        const data = await response.json()
        if (data.status !== "error") {
            setUserOrder(data.message)
        }
    }


    async function update(id, values) {
        const response = await fetch(`${url}/api/order/update/${id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        const data = await response.json()
        if (data.status !== "error") {
        }
    }

    async function deleteOrder(id, type) {
        const response = await fetch(`${url}/api/order/delete/${id}`, {
            method: "delete"
        })
        const data = await response.json()
        if (data.status !== "error") {
            if (type === "user") {
                let newOrder = userOrder.filter(order => order._id !== id)
                setUserOrder(newOrder)
            } else if (type === "today") {
                let newOrder = todayOrders.filter(order => order._id !== id)
                setTodaysOrders(newOrder)
            }
            else {
                let newOrder = orders.filter(order => order._id !== id)
                setOrders(newOrder)
            }
        }
    }



    async function getTodaysOrder() {
        const response = await fetch(`${url}/api/order/gettodayorder`, {
            method: "post"
        })
        const data = await response.json()
        if (data.status !== "error") {
            setTodaysOrders(data.message)
        }
    }

    async function profitCalculator(adminToken) {
        const response = await fetch(`${url}/api/order/getearnings`,{
            headers:{
                "admin-token":adminToken
            }
        })
        const data = await response.json()
        if (data.status !== "error") {
            setEarcning(data.message)
        }
    }

    async function fetchFoodOrder(){
        const response=await fetch(`${url}/api/order/foodOrderCount`)
        const response_data=await response.json()
        setFoodOrder(response_data)
      }


    return (
        <orderContext.Provider value={{
            createOrder,
            fetchAllOrders,
            fetchOrderByUserId,
            update,
            deleteOrder,
            getTodaysOrder,
            orders,
            userOrder,
            todayOrders,
            profitCalculator,
            earning,
            foodOrder,
            fetchFoodOrder
        }}>
            {props.children}
        </orderContext.Provider>
    )
}