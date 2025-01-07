import React from 'react'

function Game_Nomal({ userLog }) {

    return (
        <div>
            {userLog.map((item, index) => {
                return (
                    <>
                        <div className='user'>
                            <div className='first'>
                                <div style={{ fontWeight: "bold", fontSize: "20px", color: "silver" }}>{item.rank}</div>
                                <div>{item.type}</div>
                                <div>{item.timeAgo}</div>
                            </div>
                            <div className='second'>
                                <img className='char_img' src={`${process.env.PUBLIC_URL}/image/Char/icon/Yuki.png`} />
                                <img className='char_wephon' src={`${process.env.PUBLIC_URL}/image/WeaponMastery/02. Two-Handed Sword.png`} />
                                <div className='charLevel'>{item.weaponLevel}</div>
                            </div>
                            <div style={{ display: "block", width: "70px" }}>
                                <img className='ability' src={require("../../../image/Ability/Havoc/Frailty Infliction.png")} />
                                <img className='sub_ability' src={require("../../../image/Ability/Fortification/Diamond Shard.png")} />
                            </div>
                            <div className='third'>
                                <div style={{
                                    fontfontWweight: "400",
                                    textAlign: "left !important",
                                    marginBottom: "2px",
                                    wordSpacing: "-2px"
                                }}>TK / K / A</div>
                                <div className='user_kah'>{item.TKA}</div>
                            </div>
                            <div className='forth'>
                                <div style={{ fontWeight: "300", marginBottom: "2px" }}>MMR</div>
                                <div style={{ fontWeight: "bold", fontSize: "20px" }}>{item.mmr}</div>
                            </div>
                            <div className='fifth'>
                                <div style={{ fontWeight: "300" }}>Route</div>
                                <div style={{ fontSize: "18px", fontWeight: 'bold' }}>
                                    {item.routeId === "비공개" ? 
                                    <>
                                    <a href='#' style={{ textDecoration: "none", backgroundColor: "none", color: "white" , opacity:"0.5" }}>{item.routeId}</a>
                                    </>
                                    :
                                    <a href='#' style={{ textDecoration: "none", backgroundColor: "none", color: "white" }}>{item.routeId}</a>
                                    }
                                </div>
                            </div>
                            <div className='sixth'>
                                <div><img src={`${process.env.PUBLIC_URL}/image/Item/Weapon/ItemIcon_101303_CarapaceKatar.png`} /></div>
                                <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/Itemicon_202406_Rocker'sJacket.png`} /></div>
                                <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/ItemIcon_205503_Kundala.png`} /></div>
                                <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/ItemIcon_205213_MarksmanHandbook.png`} /></div>
                                <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/ItemIcon_204410_GlacialShoes.png`} /></div>
                                <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/ItemIcon_202501_Kabana.png`} /></div>
                            </div>
                            <div className='seventh'>
                                {/* <button onClick={(e) => handleClickOpen(e, index)}></button> */}
                            </div>
                        </div >
                        {/* {clickButton === true (
                    <div style={{ position: "relative", display: "block" }}>
                      <div className={clickButton ? 'add_gameLog' : 'addgameLog'} style={{ width: "800px", height: "110px", backgroundColor: "#474747" }}>
                        <Log_Detail show={nickname} />
                      </div>
                    </div>
                    )} */}
                    </>
                )
            })}
        </div >
    )
}

export default Game_Nomal
