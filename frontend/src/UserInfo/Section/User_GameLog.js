import React, { useState ,useEffect } from 'react'
import './css/User_GameLog.css'

function User_GameLog({useData , mostData}) {

    return (
        <>
        <div className='most_op'>
            <div>
            {mostData && <img className='most_img' src={`${process.env.PUBLIC_URL}${mostData.most_one_charimg}`} /> }
            </div>
           <div className='left_op'>
             <div style={{color:"white"}}>{mostData && mostData.most_one_charName}</div>   
             <div style={{color:"white"}}>25 Games</div>   
           </div>
            <div className='right_op'>
             <div>승 률</div>
             <div>5.24 %</div>
            </div>
        </div>

        <div className='most_op'>
            <div>
                {mostData && <img className='most_img' src={`${process.env.PUBLIC_URL}${mostData.most_two_charimg}`} />}
            </div>
           <div className='left_op'>
             <div style={{color:"white"}}>{mostData && mostData.most_two_charName}</div>   
             <div style={{color:"white"}}>25 Games</div>   
           </div>
            <div className='right_op'>
             <div>승 률</div>
             <div>5.24 %</div>
            </div>
        </div>

        <div className='most_op'>
            <div>
                {mostData &&<img className='most_img' src={`${process.env.PUBLIC_URL}${mostData.most_three_charimg}`} /> }
            </div>
           <div className='left_op'>
             <div style={{color:"white"}}>{mostData && mostData.most_three_charName}</div>   
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