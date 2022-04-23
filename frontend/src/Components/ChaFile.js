import React, { useState } from 'react'
import '../image/*'

function ChaFile() {

    const [name , setName] = useState("");

    const CharImg = () => {
        if(name === "재키_id"){
            backGroundImg = "재키이미지"
        }else if(name === "유키_id"){
            backGroundImg = "유키 이미지"
        }
    }

  return (
      <>
    <div className='Char_Image' >
    </div>
      </>
  )
}

export default ChaFile