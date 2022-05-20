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
  const [searchInputForm, setSearchInputForm] = useState("")
  const [useError, setUserError] = useState(false)
  const [clickButton, setClickButton] = useState(false)
  const [clickIndex, setClickIndex] = useState("")
  const [toggleState, setToggleState] = useState(1)
  const [arr, setArr] = useState([])
  const [tierInfo, setTierInfo] = useState([]);
  const [bool , setBool] = useState(true)
  const [bool2 , setBool2] = useState(true)

  const publicUrl = process.env.PUBLIC_URL;

  useEffect(() => {
    getUserGame()
    getUserInfo()
  }, [bool,bool2])


  useEffect(() => {
    getTierInfo()
  }, [userData, arr[0]])



  const userNotFount = () => {
    try {
      axios.post(
        'http://127.0.0.1:8000/api/UserInfo/',
        {
          nickname: nickname
        },
      ).then(
        setBool2(false)
      )
    } catch (error) {
      console.error("에러가 이건가?" + error);
    }
  }

  const gameNotFount = () => {
    try {
      axios.post(
        'http://127.0.0.1:8000/api/UserGameRecord/',
        {
          nickname: nickname
        },
      ).then(
        setBool2(false),
        console.log("게임로그 보내기 성공")
      )
    } catch (error) {
      console.error("에러가 이건가?" + error);
    }
  }

  const getUserGame = () => {
    try {
      axios.get(
        'http://127.0.0.1:8000/api/UserGameRecord/' + nickname + '/')
        .then(response => {
          console.log(response)
          setUserRecode(response.data); 
          setBool(true)
        })
        .catch(error => {
          console.error(error);
          gameNotFount()
        })
      } catch (error) {
        console.error(error);
        gameNotFount()
    }
  }

  const getUserInfo = () => {
    try {
      axios.get(
        'http://127.0.0.1:8000/api/UserInfo/' + nickname + '/'

      )
        .then(response => {
          console.log(response)
          setUserData(response.data)
          setBool2(true)
        })
        .catch(error => {
          userNotFount();
        })
    } catch (error) {
      console.error(error);
    }
  }

  const getTierInfo = () => {
    if (userData.soloTier !== undefined) {
      setArr(userData.soloTier.split(" "))
    }
    if (arr[0] !== undefined) {
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

  const handleChangeInput = (event) => {
    event.preventDefault()
    setSearchInputForm(event.target.value)
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
          <div className='pentagon_content'>
            <div className='user_Stat'>
              <Pentagon name={nickname} infoTier={tierInfo} dataUser={userData} usertier={arr[0]} />
              {/* <img className='char' src={require('../image/Char/Full/Full.png')} style={{transform:"rotate(90deg)" , transform:"scaleX(-1)"}} /> */}
              <User_Stats name={nickname} useData={userData} infoTier={tierInfo} />
            </div>
          </div>


          <div className='user_Content'>
            <div>
              <div className='select_modeAll'>
                <span className={toggleState === 1 ? "active_toggle" : "B"} style={{ width: "55px" }} ><a href='#' onClick={() => toggleTabs(1)}>전체</a></span>
                <span className={toggleState === 2 ? "active_toggle" : "B"} style={{ width: "55px" }} ><a href='#' onClick={() => toggleTabs(2)}>일반</a></span>
                <span className={toggleState === 3 ? "active_toggle" : "B"} style={{ width: "55px" }} ><a href='#' onClick={() => toggleTabs(3)}>솔로</a></span>
                <span className={toggleState === 4 ? "active_toggle" : "B"} style={{ width: "55px" }} ><a href='#' onClick={() => toggleTabs(4)}>듀오</a></span>
                <span className={toggleState === 5 ? "active_toggle" : "C"} style={{ width: "70px" }}><a href='#' onClick={() => toggleTabs(5)}>스쿼드</a></span>
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
                      {userRecode[item].ranking === 1 &&
                        <>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "yellow" }}>#{userRecode[item].ranking}</div>
                        </>
                      }
                      {userRecode[item].ranking === 2 &&
                        <>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "orange" }}>#{userRecode[item].ranking}</div>
                        </>
                      }
                      {userRecode[item].ranking === 3 &&
                        <>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "skyblue" }}>#{userRecode[item].ranking}</div>
                        </>
                      }
                      {userRecode[item].ranking > 3 &&
                        <>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "silver" }}>#{userRecode[item].ranking}</div>
                        </>
                      }

                      <div>{userRecode[item].matchingMode}</div>
                      <div>6시간 전</div>
                    </div>
                    <div className='second'>
                      <img className='char_img' src={`${process.env.PUBLIC_URL}${userRecode[item].charImg}`} />
                      <img className='char_wephon' src={`${process.env.PUBLIC_URL}${userRecode[item].bestWeaponImg}`} />
                      <div className='charLevel'>{userRecode[item].bestWeaponLevel}</div>
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
                      <div><img src={`${process.env.PUBLIC_URL}${userRecode[item].itemImage.WeaponImg}`} /></div>
                      <div><img src={`${process.env.PUBLIC_URL}${userRecode[item].itemImage.Clothes}`} /></div>
                      <div><img src={`${process.env.PUBLIC_URL}${userRecode[item].itemImage.Head}`} /></div>
                      <div><img src={`${process.env.PUBLIC_URL}${userRecode[item].itemImage.Arm}`} /></div>
                      <div><img src={`${process.env.PUBLIC_URL}${userRecode[item].itemImage.Leg}`} /></div>
                      <div><img src={`${process.env.PUBLIC_URL}${userRecode[item].itemImage.Accessories}`} /></div>
                    </div>
                    <div className='seventh'>
                      {/* <button onClick={(e) => handleClickOpen(e, index)}></button> */}
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