import React,{useState,useEffect} from 'react'

export default function Addadmin() {
  const [adminsList,setAdminList]=useState([])
  const [admin,setAdmin]=useState({name:"",password:""})
  // const url="http://localhost:3001"
  const url = "https://zany-red-katydid-veil.cyclic.app"



  const adminToken=sessionStorage.getItem('admintoken')
  
  useEffect(()=>{
    fetchallAdmin()
    // eslint-disable-next-line
  },[])
  
  async function fetchallAdmin(){
    const response=await fetch(`${url}/api/admin/getalladmin`,{
      headers:{
        "admin-token":adminToken
      }
    })
    const data=await response.json()
    if(data.status!=="error"){
      setAdminList(data.message)
    } 
  } 
  async function createAdmin(){
    if(admin.name===""||admin.password==="") return alert("Fill all the fields")

    const response=await fetch(`${url}/api/admin/create`,{
      headers:{
        "admin-token":adminToken,
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify({
        name:admin.name,
        password:admin.password
      })
    })
    const data=await response.json()
    if(data.status!=="error"){
      setAdminList(adminsList.concat(data.admin))
      alert("Created")
      setAdmin({name:"",password:""})
      
    } 
    else{
      alert(data.message)
    }
  }

  async function deleteAdmin(id){
    const response=await fetch(`${url}/api/admin/delete/${id}`,{
      headers:{
        "admin-token":adminToken
      },
      method:"DELETE"
    })
    const data=await response.json()
    if(data.status!=="error"){
      let newAdminList=adminsList.filter(admin=>admin._id!==id)
      setAdminList(newAdminList)
    }
    else{
      alert("Unable to delete")
    } 
  }

  function handleChange(e){
    setAdmin({...admin,[e.target.name]:e.target.value})
  }
  return (
    <div className='addAdminContainer'>
        <div className="adminList">
        <ul>
            <h2>Admin list</h2>
            {
              adminsList && adminsList.map(admins=>{
                return (<p key={admins._id}>{admins.name}<button onClick={()=>{deleteAdmin(admins._id)}}>delete</button></p>)
              })
            }
        </ul>
        </div>
        <div className="createAdmin">
            <div>
            <h2>Create admin</h2>
            <input type="text" name="name" id="" autoComplete='off' placeholder='Enter username' onChange={handleChange} value={admin.name}/>
            <input type="password" name="password" id="" placeholder='Enter password' onChange={handleChange} value={admin.password}/>
            <button onClick={createAdmin}>Create</button>
            </div>
        </div>
    </div>
  )
}
