import React, { useState, useEffect } from 'react'
import './css/User_GameLog.css'

function User_GameLog({ useData, mostData }) {

    const [userInfo , setUserInfo] = useState([
        {
            krChar : "알렉스",
            char : "Alex",
            games  : "78",
            winning : "12.3"
        },
        {
            krChar : "쇼이치",
            char : "Shoichi",
            games  : "53",
            winning : "7.3"
        },
        {
            krChar : "유키",
            char : "Yuki",
            games  : "32",
            winning : "4.2"
        }
    ]
    )

    return (
        <>
            <div>
                <div className='log_header' style={{backgroundColor:"#50586C" , width:"100%",height:"30px",padding:"0.15rem 0.15rem" ,color:"#DCE2F0"}}>
                    <div>
                        <span style={{width:"70%" , marginLeft:"5px",marginTop:"5px",marginBottom:"5px"}}>캐릭터</span>
                    </div>
                    <div style={{margin :"0 0 auto auto"}}>
                        <span >KDA</span>
                        <span style={{marginLeft:"20px"}}>승 률</span>
                    </div>
                </div>
                {userInfo.map((item,idx) => {
                    return(
                            <div className='most_op'>
                                <div>
                                    { <img className='most_img' src={`${process.env.PUBLIC_URL}/image/Char/icon/${item.char}.png`} />}
                                </div>
                                <div className='left_op'>
                                    <div style={{ color: "white" }}>{item.krChar}</div>
                                    <div style={{ color: "white", fontSize: "11.5px" }}>{item.games} Games</div>
                                </div>
                                <div style={{color:"white",marginTop:"12px" , fontSize:"14px",marginRight:"10px"}}>
                                    <div>3.2</div>
                                </div>
                                <div className='right_op'>
                                    <div>{item.winning}%</div>
                                </div>
                            </div>
                    )
                })}
                {/* <div className='most_op'>
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
                </div> */}
            </div> 
        </>
    )
}

export default User_GameLog