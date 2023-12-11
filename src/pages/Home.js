import React,{useContext,useEffect} from 'react'
import {useParams} from 'react-router-dom'

import Item from "../components/Item"
import LandingPage from './LandingPage'
import "../stylesheet/Home.css"

import {foodContext} from '../Context/food'

export default function Home() {
  const foodState=useContext(foodContext)
  const {foods,fetchAllFood}=foodState

  let {tableno} =useParams()

  useEffect(()=>{
    fetchAllFood()
    // eslint-disable-next-line
  },[])

  tableno=parseInt(tableno,10)
  if(typeof tableno === 'number' && !isNaN(tableno)){
    sessionStorage.setItem("tableno",tableno)
  }

  return (
    <div className='home-container'>
        <LandingPage/>
        <div className="item-container" style={{display:foods.length!==0?"":"none"}}>
          {foods && foods.map(food=>{
            return(<Item key={food._id} id={food._id} food={food}/>)
          })}
        </div>
    </div>
  )
}
