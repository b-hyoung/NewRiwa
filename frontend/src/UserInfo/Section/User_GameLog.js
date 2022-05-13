import React, { useState ,useEffect } from 'react'
import './css/User_GameLog.css'

function User_GameLog() {

    return (
        <>
        <div className='most_op'>
            <div>
                <img className='most_img' src={require("../../image/Char/icon/Yuki.png")} />
            </div>
           <div className='left_op'>
             <div style={{color:"white"}}>유키</div>   
             <div style={{color:"white"}}>25 Games</div>   
           </div>
            <div className='right_op'>
             <div>승 률</div>
             <div>5.24 %</div>
            </div>
        </div>
        </>
    )
}

export default User_GameLog