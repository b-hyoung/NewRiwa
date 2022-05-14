import React, { useEffect, useState } from 'react'
import './UserInfoPage.css'
import Pentagon from './Section/Pentagon'
import queryString from 'query-string'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import ErrorPage from './Section/ErrorPage'
import User_GameLog from './Section/User_GameLog'
import User_Stats from './Section/User_Stat'
import Form from 'react-bootstrap/Form'
import Log_Detail from './Section/Log_Detail'


function UserinfoPage() {

  const { nickname } = useParams();
  const [userData, setUserData] = useState([])
  const [userRecode, setUserRecode] = useState("")
  const [useError, setUserError] = useState(false)
  const [clickButton, setClickButton] = useState(false)
  const [clickIndex, setClickIndex] = useState("")
  const [toggleState,setToggleState] = useState(1)
  const [arr , setArr] = useState([])
  const [tierInfo,setTierInfo] = useState([]);

  const publicUrl = process.env.PUBLIC_URL;

  useEffect(() => { 
    getUserGame()
    getUserInfo()
  }, []) 

  useEffect(() => { 
    getTierInfo() 
  }, [userData,arr[0]]) 


  const getUserGame = () => {
    try {
      axios.get(
        'http://127.0.0.1:8000/api/UserGameRecord/' + nickname + '/')
        .then(response => {
          console.log(response)
          setUserRecode(response.data);
        })
        .catch(error => {
          setUserError(true)
        })
    } catch (error) {
      console.error(error);
    }
  }

  const getUserInfo = () => {
    try {
      axios.post(
        'http://127.0.0.1:8000/api/UserInfo/'
        , {
          nickname: nickname
        },
      )
        .then(response => {
          console.log(response)
          setUserData(response.data)
        })
        .catch(error => {
          setUserError(true)
        })
    } catch (error) {
      console.error(error);
    }
  }

  const getTierInfo = () => {
    if(userData.soloTier !== undefined){
      setArr(userData.soloTier.split(" "))
    }
    if(arr[0] !== undefined){
      try { 
        axios.post(
          'http://127.0.0.1:8000/api/UserStats/'
          , {
            rank: arr[0]
          },
          )
          .then(response => {
            console.log(response.data)
            setTierInfo(response.data)
            
          })
        } catch (error) {
          console.log(error)
        }
    }
    }
    
    const handleClickOpen = (e, index) => {
      e.preventDefault(); 
      if (clickButton === true) {
      setClickButton(false);
      setClickIndex(index)
    } else if (clickButton === false) {
      setClickButton(true);
      setClickIndex(index)
    }
  }

  const toggleTabs = (index) => {
    setToggleState(index)
    // if(index === 1){
    //   setUserData("전체")
    // }else if(index === 2){
    //   setUserData("일반")
    // }else if(index === 3){
    //   setUserData("솔로")
    // }else if(index === 4){
    //   setUserData("듀오")
    // }else if(index === 5){
    //   setUserData("스쿼드")
    // }
  }

  

  return (
    <div className='page_wrap'>
      {useError === false ? (
        <>
          <div className='user_name'>
            {nickname}
          </div>
          <div className='pentagon_content'>
            <div className='user_Stat'>
              <Pentagon name={nickname} infoTier={tierInfo}  dataUser={userData} usertier={arr[0]} />
              <img className='char' src={`${process.env.PUBLIC_URL}${userData.mainCharImg}`} />
              {/* <img className='char' src={require('../image/Char/Full/Full.png')} style={{transform:"rotate(90deg)" , transform:"scaleX(-1)"}} /> */}
              <User_Stats />
            </div>
          </div>

          <div className='user_Content'>
          <div>
              <div className='select_modeAll'>
                <span className={toggleState === 1 ? "active_toggle" : ""}><a href='#' onClick={() => toggleTabs(1)}>전체</a></span>
                <span className={toggleState === 2 ? "active_toggle" : ""}><a href='#' onClick={() => toggleTabs(2)}>일반</a></span>
                <span className={toggleState === 3 ? "active_toggle" : ""}><a href='#' onClick={() => toggleTabs(3)}>솔로</a></span>
                <span className={toggleState === 4 ? "active_toggle" : ""}><a href='#' onClick={() => toggleTabs(4)}>듀오</a></span>
                <span className={toggleState === 5 ? "active_toggle" : ""}><a href='#' onClick={() => toggleTabs(5)}>스쿼드</a></span>
              </div>
            </div>

            <div className='user_Infos'>
              <User_GameLog useData={userData} mostData={userData.mostpick} />
            </div>

            <div className='user_GameLog'>
              {userRecode && Object.keys(userRecode).map((item, index) => (
                <div>
                  <div className='user'>
                    <div className='first'>
                      {userRecode[item].rank === 1 &&
                        <>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "yellow" }}>#{userRecode[item].rank}</div>
                        </>
                      }
                      {userRecode[item].rank === 2 &&
                        <>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "orange" }}>#{userRecode[item].rank}</div>
                        </>
                      }
                      {userRecode[item].rank === 3 &&
                        <>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "skyblue" }}>#{userRecode[item].rank}</div>
                        </>
                      }
                      {userRecode[item].rank > 3 &&
                        <>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "silver" }}>#{userRecode[item].rank}</div>
                        </>
                      }

                      <div>{userRecode[item].matchingMode}</div>
                      <div>6시간 전</div>
                    </div>
                    <div className='second'>
                      <div className='charLevel'>{userRecode[item].bestWeaponLevel}</div>
                      <img className='char_img' src={require("../image/Char/icon/Yuki.png")} />
                      <img className='char_wephon' src={require("../image/WeaponMastery/07. Sniper Rifle.png")} />
                    </div>
                    <div style={{ display: "block", width: "70px" }}>
                      <img className='ability' src={require("../image/Ability/Havoc/Frailty Infliction.png")} />
                      <img className='sub_ability' src={require("../image/Ability/Fortification/Diamond Shard.png")} />
                    </div>
                    <div className='third'>
                      <div style={{ fontSize: "15px", textAlign: "left !important", marginBottom: "-4px" }}>K/A/H</div>
                      <div className='user_kah'>{userRecode[item].Kills}/{userRecode[item].Assistants}/{userRecode[item].Hunts}</div>
                    </div>
                    <div className='forth'>
                      <div style={{ marginBottom: "-4px" }}>MMR</div>
                      <div style={{ fontWeight: "bold", fontSize: "20px" }}>{userRecode[item].mmr}</div>
                    </div>
                    <div className='fifth'>
                      <div>Route</div>
                      <div style={{ fontSize: "13px" }}><a href='#' style={{ textDecoration: "none", backgroundColor: "none", color: "white" }}>567655</a></div>
                    </div>
                    <div className='sixth'>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className='seventh'>
                      <button onClick={(e) => handleClickOpen(e, index)}>/''/</button>
                    </div>
                  </div>
                  {clickButton === true && index === clickIndex && (
                    <div style={{ position: "relative", display: "block" }}>
                      <div className={clickButton ? 'add_gameLog' : 'addgameLog'} style={{ width: "800px", height: "110px", backgroundColor: "#474747" }}>
                        <Log_Detail show={nickname} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>
          <ErrorPage />
        </div>
      )
      }
    </div>
  )
}

export default UserinfoPage