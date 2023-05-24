import React from 'react'
import "../../css/additem.css"
import { useState } from 'react'

const AddProduct = () => {
  const [image,setImage] = useState("")
  const [pname,setPname] = useState('Enter Name eg."Mango"')
  const [pdes,setPdes] = useState('Enter Description eg."sweeet"')
  const [pprice,setPprice] = useState('Enter Price eg."120"')
  const [pquan,setPquan] = useState('Enter Quantity eg."12kg"')


  const UploadImage=()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","greenx")
    data.append("cloud_name","dyog3kn22")
    fetch("https://api.cloudinary.com/v1_1/dyog3kn22/image/upload",{
      method:"post",
      body:data
    })
    .then((res)=>res.json())
    .then((data)=>{console.log(data);})
    .catch((err)=>{console.log(err);})
  }

  const UploadProduct = () =>{

  }

  return (
    <>
      <div style={{"height":"87.5vh","display":'flex',"justifyContent":"center","alignItems":'center'}}>
        <div style={{"background":"transperant", "height":"700px","width":"1000px",'border':"2px solid black","backdropFilter": 'blur(5px)','boxShadow': '0 0 30px rgba(0,0,0,.5)','alignItems':'center'}}>
            <h2 style={{textAlign:"center"}}>Enter Product Details</h2>
            <div style={{marginTop:"100px"}} className='additemForm'>
                <lable> Product Name:</lable>
                <input type='text' placeholder={pname} onChange={(e)=>{setPname(e.target.value)}}/><br/>
                <lable> Product Description:</lable>
                <input type='text' placeholder={pdes} onChange={(e)=>{setPdes(e.target.value)}}/><br/>
                <lable> Product Price:</lable>
                <input type='number' placeholder={pprice} onChange={(e)=>{setPprice(e.target.value)}}/><br/>
                <lable> Product Quantity:</lable>
                <input type='text' placeholder={pquan} onChange={(e)=>{setPquan(e.target.value)}}/><br/>
                <lable> Product Image:</lable>
                <input type='file' onChange={(e)=>{setImage(e.target.files[0])}}/> <button type='button' onClick={UploadImage}> Upload Image</button><br/>
                <h2 style={{textAlign:"center"}}><button type='button' onClick={UploadProduct} style={{height:"50px",width:"150px",fontSize:"1.4em",marginTop:"80px"}}>Submit</button></h2>
            </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct