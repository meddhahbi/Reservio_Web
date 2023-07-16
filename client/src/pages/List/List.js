import React from 'react'
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/Header/Header.js";

const List = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className='listContainer'>

      </div>
    </div>
  )
}

export default List