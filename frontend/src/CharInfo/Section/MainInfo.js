import React from 'react'
import './css/MainInfo.css'

function MainInfo() {
    return (
        <div style={{ padding: "1rem 1rem", position: "absolute" }}>
            <div className='char_weapon'>
                <img src={require('../../image/WeaponMastery/04. Dual Swords.png')} />
                <span>쌍검 100%</span>
            </div>
            <div>
                <img className='char_Profile' src={require("../../image/Char/icon/Yuki.png")} />
            </div>
            <div className='char_Skill'>
                <div>
                    <img src={require("../../image/Skill/Yuki/Yuki_Passive.png")} />
                    <div className='passive'>T</div>
                </div>
                <div>
                    <img src={require("../../image/Skill/Yuki/Yuki_Q.png")} />
                    <div className='skill_Q'>Q</div>
                </div>
                <div>
                    <img src={require("../../image/Skill/Yuki/Yuki_W.png")} />
                    <div className='skill_W'>W</div>
                </div>
                <div>
                    <img src={require("../../image/Skill/Yuki/Yuki_E.png")} />
                    <div className='skill_E'>E</div>
                </div>
                <div>
                    <img src={require("../../image/Skill/Yuki/Yuki_R.png")} />
                    <div className='skill_R'>R</div>
                </div>
            </div>
            <div className='char_avg'>
                <div style={{fontSize:"13px" , marginBottom:"10px",position:"relative",left:"40px"}}>* 플레티넘 이상의 티어에서 집계된 정보입니다.</div>
                <div className='avg_pick'>
                    <span >픽률</span>
                    <span className='avg_persent' > 16.5%</span>
                    <div className='gage_bar'>
                        <div className='in_bar' style={{width:"56%"}}></div>
                    </div>
                </div>
                <div className='avg_winning'>
                    <span>승률</span>
                    <span className='avg_persent' > 4.43%</span>
                    <div className='gage_bar'>
                        <div className='in_bar' style={{width:"42%"}}></div>
                    </div>
                </div>
                <div className='avg_rank'>
                    <span>평균 순위 </span>
                    <div className='avg_persent' >#7.3 </div>
                    <div className='gage_bar'>
                        <div className='in_bar' style={{width:"70%"}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainInfo