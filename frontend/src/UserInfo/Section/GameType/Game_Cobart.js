import React from 'react'

function Game_Cobart({userLog}) {
  return (
    <div>
      {userLog.map((item,index) => {
        return(
          <>
<div className='user'>
        <div className='first'>
          <div style={{ fontWeight: "bold", fontSize: "20px", color: "silver" }}>{item.rank}</div>
          <div>{item.type}</div>
          <div>{item.timeAgo}</div>
        </div>
        <div className='second'>
          <img className='char_img' src={`${process.env.PUBLIC_URL}/image/Char/icon/Shoichi.png`} />
          <img className='char_wephon' src={`${process.env.PUBLIC_URL}/image/WeaponMastery/Nunchaku.png`} />
          <div className='charLevel'>{item.weaponLevel}</div>
        </div>
        <div style={{ display: "block", width: "70px" }}>
          <img className='ability' src={require("../../../image/Ability/Havoc/Spirit Culling.png")} />
          <img className='sub_ability' src={require("../../../image/Ability/Fortification/Cavalcade.png")} />
        </div>
        <div className='third'>
          <div style={{
            fontfontWweight: "400",
            textAlign: "left !important",
            marginBottom: "2px",
            wordSpacing: "-2px"
          }}>
            TK / K / A
          </div>
          <div className='user_kah'>{item.TKA}</div>
        </div>
        <div className='forth'>
          <div style={{ marginBottom: "2px", fontWeight: "300" }}>MMR</div>
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>{item.mmr}</div>
        </div>
        <div className='fifth'>
          <div style={{ fontWeight: "300" }}>Route</div>
          <div style={{ fontSize: "18px", fontWeight: '300' , opacity:"0.5" }}><a href='#' style={{ textDecoration: "none", backgroundColor: "none", color: "white" }}>{item.routeId}</a></div>
        </div>
        <div className='sixth'>
          <div><img src={`${process.env.PUBLIC_URL}/image/Item/Weapon/ItemIcon_121402_StairwaytoHeaven.png`} /></div>
          <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/ItemIcon_201414_Diadem.png`} /></div>
          <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/ItemIcon_205503_Kundala.png`} /></div>
          <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/ItemIcon_203501_BraceletofSkadi.png`} /></div>
          <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/ItemIcon_204410_GlacialShoes.png`} /></div>
          <div><img src={`${process.env.PUBLIC_URL}/image/Item/Amor/ItemIcon_205501_EmeraldTablet.png`} /></div>
        </div>
        <div className='seventh'>
          {/* <button onClick={(e) => handleClickOpen(e, index)}></button> */}
        </div>
      </div>
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
    </div>
  )
}

export default Game_Cobart
