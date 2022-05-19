import React from 'react'
import './css/Log_Detail.css'

function Log_Detail({ show }) {

    return (
        <>  
        <div className='detail_animation'>
            <div className='detail_top'>
                <span style={{width : "30px" , marginRight:"15px", marginLeft:"5px"}}>등 수</span>
                <span style={{width : "130px" , marginRight:"180px"}}>실험체 정보</span>
                <span style={{width : "100px"}}>피해량</span>
            </div>
            <div className='detail_view'>
                <div className='detail_rank'>
                    <span>#1</span>
                </div>
                <div className='detail_char_image'>
                    <img className='char_img' src={require("../../image/Char/icon/Yuki.png")} />
                    {/* <img className='char_wephon' src={require("../../image/WeaponMastery/07. Sniper Rifle.png")} /> */}
                </div>
                <div className='detail_ability'>
                    <img className='ability' src={require("../../image/Ability/Havoc/Frailty Infliction.png")} />
                    <img className='sub_ability' src={require("../../image/Ability/Fortification/Diamond Shard.png")} />
                </div>
                <div className='detail_info'>
                    {/* <img src={require("../../image/Tier/Platinum.png")} /> */}
                    <div style={{ marginLeft: "5px" }}>
                        <div>김밥님</div>
                        <div style={{ width: "130px" }} >Platinum lV - 32 LP</div>
                    </div>
                </div>
                <div className='detail_demage'>
                    <div >가한 피해량</div>
                    <div className='demage_bar'>
                        <div style={{ width: "50%", height: "10px", backgroundColor: "yellow", borderRadius: "7px" }}></div>
                    </div>
                </div>
                <div className='detail_item'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Log_Detail