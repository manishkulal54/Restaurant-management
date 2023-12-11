import React, { useState, useContext, useEffect } from "react";

import { foodContext } from "../Context/food";

export default function Foods() {
  const foodState = useContext(foodContext);
  const { fetchAllFood, addFood, updateFood, foods, deleteFood} =foodState;
  const adminToken=sessionStorage.getItem('admintoken')
  useEffect(() => {
    fetchAllFood();
    // eslint-disable-next-line
  }, []);


  const [editBoxVisibility, setEditBoxVisibility] = useState(false);
  const [addFoodVisibility, setAddFoodBoxVisibility] = useState(false);

  const [edittext, setEditText] = useState({
    name: "",
    desc: "",
    price: "",
    diet: "",
    temp: "",
    img: ""
  });

  
  const [addtext, setAddText] = useState({
    id: "",
    name: "",
    desc: "",
    price: "",
    diet: "",
    temp: "",
    img: ""
  });
  const [errormsg,setErrormsg]=useState("")



  function editChange(e) {
    setEditText({ ...edittext, [e.target.name]: e.target.value });
  }
  function addChange(e) {
    setAddText({ ...addtext, [e.target.name]: e.target.value });
  }



  function handleAdd(e) {
    e.preventDefault();
    const {name,desc,diet,temp,price,img}=addtext
    if(name==="" || desc==="" || diet==="" || temp==="" || price==="" || img==="") return errorDisplayer("Fill all the fields")
    addFood({
      name: addtext.name,
      description: addtext.desc,
      foodType1: addtext.diet,
      foodType2: addtext.temp,
      price: addtext.price,
      img:addtext.img
    },adminToken);
    setAddFoodBoxVisibility(false)
    setAddText({
      id: "",
    name: "",
    desc: "",
    price: "",
    diet: "",
    temp: "",
    img: ""
    })
  }

function errorDisplayer(err){
  setErrormsg(err)
  setTimeout(() => {
    setErrormsg("")
  }, 5000);
}


  function handleEditBtn(food) {
    const { name, description, price, foodType,image } = food;
    setEditText({
      id: food._id,
      name,
      desc: description,
      price: price,
      diet: foodType.diet,
      temp: foodType.temperature,
      img:image
    });
  }

  function handleEdit() {
    const {name, desc, price, diet, temp,img } = edittext
    if(name===""|| desc===""|| price===""|| diet===""|| temp==="" || img==="") return errorDisplayer("Fill all the fields")
    updateFood(edittext,adminToken)
    setEditBoxVisibility(false)
  }




  return (
    <div className="foodContainer">
      {/* from here */}




      {foods && foods.map((food) => {
        return (
          <div className="food-box" key={food._id}>
            <img src={food.image} alt={food.name} />
            <div className="foodInfo">
              <p>
                <strong>{food.name}</strong>
              </p>
              <p className="description">{food.description}</p>
              <p>price : {food.price}</p>
              <div>
                <p>Diet:{food.foodType.diet}</p>
                <p>Temperature:{food.foodType.temperature}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    editBoxVisibility
                      ? setEditBoxVisibility(false)
                      : setEditBoxVisibility(true);
                    handleEditBtn(food);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    let promptValue = window.confirm(
                      "Do you really want to delete"
                    );
                    if (promptValue) deleteFood(food._id,adminToken);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}



      {/*  */}











      <button
        className="addFood"
        onClick={() => {
          addFoodVisibility
            ? setAddFoodBoxVisibility(false)
            : setAddFoodBoxVisibility(true);
        }}
      >
        {addFoodVisibility ? "Close box" : "Add Food"}
      </button>








      {/* Edit Box */}
      <div
        className="editBox"
        style={{ display: editBoxVisibility ? "flex" : "none" }}
      >
        <h2>Edit food</h2>
        <input
          type="text"
          name="img"
          placeholder="Food Image url"
          onChange={editChange}
          value={edittext.img}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Food name"
          name="name"
          onChange={editChange}
          value={edittext.name}
          autoComplete="off"
        />
        <textarea
          name="desc"
          id=""
          cols="30"
          rows="10"
          placeholder="description"
          onChange={editChange}
          value={edittext.desc}
        ></textarea>
        <input
          type="text"
          placeholder="price"
          name="price"
          onChange={editChange}
          value={edittext.price}
          autoComplete="off"
        />
        <select name="diet" id="" onChange={editChange} value={edittext.diet}>
          <option value="" disabled>
            select the food type
          </option>
          <option value="veg">Veg</option>
          <option value="nonveg">Nonveg</option>
        </select>
        <select name="temp" id="" onChange={editChange} value={edittext.temp}>
          <option value="" disabled>
            Hot/Cold
          </option>
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
        </select>
        <p style={{color:"red"}}>{errormsg}</p>
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => setEditBoxVisibility(false)}>Close</button>
        </div>
      </div>











      {/* Add new food */}
      <div 
      className="editBox" style={{ display: addFoodVisibility ? "flex" : "none" }}>
        <h2>Add Food</h2>
        <input
          type="text"
          name="img"
          placeholder="Image Url"
          onChange={addChange}
          value={addtext.img}
        />
        <input
          type="text"
          placeholder="Food name"
          name="name"
          onChange={addChange}
          value={addtext.name}
        />
        <textarea
          name="desc"
          id=""
          cols="30"
          rows="10"
          placeholder="description"
          onChange={addChange}
          value={addtext.desc}
        ></textarea>
        <input
          type="text"
          placeholder="price"
          name="price"
          onChange={addChange}
          value={addtext.price}
        />
        <select id="" name="diet" onChange={addChange} value={addtext.diet}>
          <option value="" disabled>
            select the food type
          </option>
          <option value="veg">Veg</option>
          <option value="nonveg">Nonveg</option>
        </select>
        <select name="temp" id="" onChange={addChange} value={addtext.temp}>
          <option value="" disabled>
            Hot/Cold
          </option>
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
        </select>
        <p style={{color:"red"}}>{errormsg}</p>
        <div>
          <button onClick={handleAdd}>Add</button>
          <button onClick={() => setAddFoodBoxVisibility(false)}>Close</button>
        </div>
      </div>
    </div>
  );
}
