import React, { useState, useEffect } from 'react'
import './UserInfo.css'

function UserInfo({ useData }) {

  const [userData , setUserData] = useState([]);
  const [user2Data , setUser2Data] = useState(["짬뽕","짜장면","이것저것"]);
  

  useEffect(() => {
    console.log(useData.data[0])
  }, [])

  return (
    <>
      {/* {useData && user2Data.map((item) => {
        
      })} */}
    </>
  )
}

export default UserInfo