import React, { useState, useEffect } from 'react'
import './css/User_GameLog.css'

function User_GameLog({ useData, mostData }) {

    const [userInfo , setUserInfo] = useState({
        most : "",
        games  : "",
        win : "",
    })

    return (
        <>
            <div>
                <div className='log_header' style={{backgroundColor:"#50586C" , width:"100%",height:"30px",padding:"0.15rem 0.15rem" ,color:"#DCE2F0"}}>
                    <span style={{width:"70%" , marginLeft:"5px",marginTop:"5px",marginBottom:"5px"}}>캐릭터</span>
                    <span style={{marginLeft:"130px"}}>승 률</span>
                </div>
                <div className='most_op'>
                    <div>
                        { <img className='most_img' src={`${process.env.PUBLIC_URL}/image/Char/icon/Alex.png`} />}
                    </div>
                    <div className='left_op'>
                        <div style={{ color: "white" }}>Alex</div>
                        <div style={{ color: "white", fontSize: "11.5px" }}>133 Games</div>
                    </div>
                    <div className='right_op'>
                        <div>27.3 %</div>
                    </div>
                </div>

                <div className='most_op'>
                    <div>
                        { <img className='most_img' src={`${process.env.PUBLIC_URL}/image/Char/icon/Shoichi.png`} />}
                    </div>
                    <div className='left_op'>
                        <div style={{ color: "white" }}>Shoichi</div>
                        <div style={{ color: "white", fontSize: "11.5px" }}>78 Games</div>
                    </div>
                    <div className='right_op'>
                        <div>17.3 %</div>
                    </div>
                </div>

                <div className='most_op'>
                    <div>
                        {<img className='most_img' src={`${process.env.PUBLIC_URL}/image/Char/icon/Chloe.png`} />}
                    </div>
                    <div className='left_op'>
                        <div style={{ color: "white" }}>Chloe</div>
                        <div style={{ color: "white", fontSize: "11.5px" }}>54 Games</div>
                    </div>
                    <div className='right_op'>
                        <div>33.7 %</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User_GameLog