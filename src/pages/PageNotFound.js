import React from 'react'
import {useNavigate} from "react-router-dom"

export default function PageNotFound() {
    const navigate=useNavigate()
    let tableno=sessionStorage.getItem("tableno")
    if(tableno) navigate(`/${tableno}`)
    else navigate(`/`)
    
  return (
    <h1>PageNotFound</h1>
  )
}
