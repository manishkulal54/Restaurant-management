import axios from 'axios';
// eslint-disable-next-line
import React, { useState, createContext } from 'react'

const foodContext = createContext()
export { foodContext };

export default function FoodState(props) {
    // eslint-disable-next-line
    const [foods, setFoods] = useState([])
    const [responseData, setResponseData] = useState({
        status: "",
        message: ""
    })
    const [singleFood,setSingleFood]=useState([])
    // const url = "http://localhost:3001"
    const url = "https://zany-red-katydid-veil.cyclic.app"

    
        const addFood = async (data,adminToken) => {
            const {name,description,foodType1,foodType2,price,img} =data
            axios({
                url: `${url}/api/food/create`,
                method: "POST",
                data: {
                    name,description, foodType1, foodType2, price,img
                },
                headers:{
                    "admin-token":adminToken
                }
            }).then(res => {// save to food state variable
                if (res.data.status==="error"){
                    return alert(res.data.message)
                }else{
                    setFoods(foods.concat(res.data.message))
                }
            })
            .catch(err => { console.log(err); })
        }


    const fetchAllFood = async () => {
        try {
            const response = await fetch(`${url}/api/food/getallfoods`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            setFoods(data.message)

        } catch (error) {
            console.log({ error });
        }
    }

    async function fetchSingleFood(id) {
        axios({
            url: `${url}/api/food/getfood/${id}`,
            method: "GET",
        }).then(res => {setSingleFood(res.data.message)})
            .catch(err => { console.log(err); })
    }

    async function updateFood(data,adminToken) {
        const { id,name, desc, price, diet, temp ,img} = data
        axios({
            url: `${url}/api/food/update/${id}`,
            method: "post",
            data: {
                name, description: desc, foodType1: diet, foodType2: temp, price,image:img
            },
            headers:{
                "admin-token":adminToken
            }
        }).then(res => {
            foods.forEach(food => {
                if (food._id === data.id) {
                    food.name = name
                    food.image=img
                    food.description = desc
                    food.price = price
                    food.foodType["diet"] = diet
                    food.foodType['temperature'] = temp
                }
            })
            setResponseData({ status: res.status, message: res.message })
        })
            .catch(err => { console.log(err); })
    }

    async function deleteFood(id,adminToken) {
        axios({
            url: `${url}/api/food/delete/${id}`,
            method: "DELETE",
            headers:{
                "admin-token":adminToken
            }
        }).then(res => { 
            let newFoods=foods.filter(food=>food._id!==id)
            setFoods(newFoods)
         })
            .catch(err => { console.log(err); })
    }

    return (
        <foodContext.Provider value={{
            fetchAllFood,
            addFood,
            fetchSingleFood,
            updateFood,
            deleteFood,
            foods,
            responseData,
            singleFood
        }}>
            {props.children}
        </foodContext.Provider>
    )
}
