import React from 'react'
import './Dashboard.css'
import Slidebar from './components/Slidebar/Slidebar'
import MainDash from './components/CenterDash/Centerdash'
import RightSide from './RigtSide/RightSide'
function Dashboard() {
  return (
    <div className='dashboardmain'>
       <div className='AppGlass'>
        <Slidebar></Slidebar>
        <MainDash></MainDash>
        <RightSide></RightSide>
       </div>
    </div>
  )
}

export default Dashboard