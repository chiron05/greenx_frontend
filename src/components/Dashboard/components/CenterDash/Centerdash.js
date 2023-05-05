import React from 'react'
import './Centerdash.css'
import Cards from '../../Cards/Cards'
import BasicTable from '../../Table/Table'
const MainDash = () => {
  return (
    <div className='CenterDash'>
      <h1>Dashboard</h1>
      <Cards></Cards>
      <BasicTable></BasicTable>
    </div>
  )
}

export default MainDash