import React ,{useState}from 'react'
import './Slidebar.css'
import { UilEstate } from "@iconscout/react-unicons";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
const Slidebar = () => {
    const[selected, setSelected]=useState(0)
  return (
    <div className='Sidebar'>
        <div className='logo'>
            <span>
               Green<span>X</span>
            </span> 
        </div>
        <div className='menu'>
        {
            SidebarData.map((item,index)=>{
                return(
                    <div className={selected==index?'menuItem active':'menuItem'} key={index} onClick={()=>{setSelected(index)}}>
                        <item.icon/>
                        <span> {item.heading}</span>
                    </div>
                )
            })
        }
        <div className='menuItem'>
            <UilSignOutAlt/>
        </div>
        </div>
    </div>
  )
}

export default Slidebar