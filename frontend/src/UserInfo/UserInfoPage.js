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
import Log_Detail from './Section/Log_Detail'
import Game_Nomal from './Section/GameType/Game_Nomal';
import Game_Rank from './Section/GameType/Game_Rank';
import Game_Cobart from './Section/GameType/Game_Cobart';


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
  const [bool, setBool] = useState(true)
  const [bool2, setBool2] = useState(true)

  const userInfoApi = `http://127.0.0.1:8000/api/userinfo/?username=${nickname}`

  const [userLogNomal, setUserLogNomal] = useState([
    {
      rank: "#2",
      type: "일반 게임",
      timeAgo: "3시간 전",
      weaponLevel: "14",
      TKA: "16 / 8 / 3",
      mmr: "4032",
      routeId: "57831"
    }
  ])
  const [userLogRank, setUserLogRank] = useState([
    {
      rank: "#4",
      type: "랭크 게임",
      timeAgo: "4시간 전",
      weaponLevel: "12",
      TKA: "20 / 10 / 7",
      mmr: "2251",
      routeId: "27894"
    }
  ])

  const [userLogCobart, setUserLogCobart] = useState([
    {
      rank: "패배",
      type: "코발트",
      timeAgo: "4시간 전",
      weaponLevel: "14",
      TKA: "30 / 16 / 4",
      mmr: "2783",
      routeId: "비공개"
    }
  ])

  // rank , people , timeago , weaponLevel , kah , mmr , rootId

  useEffect(()=> {
    axios.get(userInfoApi)
      .then(response => 
      {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },[])

  useEffect(() => {
    getUserGame()
    getUserInfo()
  }, [bool, bool2])


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

  //유저 게임 로그 받아오기
  const getUserGame = () => {
    // try {
    //   axios.get(
    //     'http://127.0.0.1:8000/api/UserGameRecord/' + nickname + '/')
    //     .then(response => {
    //       console.log(response)
    //       setUserRecode(response.data); 
    //       setBool(true)
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       gameNotFount()
    //     })
    //   } catch (error) {
    //     console.error(error);
    //     gameNotFount()
    // }
  }

  //유저 이름 받아오기
  const getUserInfo = () => {
    // try {
    //   axios.get(
    //     'http://127.0.0.1:8000/api/UserInfo/' + nickname + '/'

    //   )
    //     .then(response => {
    //       console.log(response)
    //       setUserData(response.data)
    //       setBool2(true)
    //     })
    //     .catch(error => {
    //       userNotFount();
    //     })
    // } catch (error) {
    //   console.error(error);
    // }
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

  //클릭하면 대전기록 열자
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

  //유저 이름 검색
  const handleChangeInput = (event) => {
    event.preventDefault()
    setSearchInputForm(event.target.value)
  }

  //모드 선택
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
                <span className={toggleState === 1 ? "active_toggle" : "B"}><a href='#' onClick={() => toggleTabs(1)}>전체</a></span>
                <span className={toggleState === 2 ? "active_toggle" : "B"}><a href='#' onClick={() => toggleTabs(2)}>일반</a></span>
                <span className={toggleState === 3 ? "active_toggle" : "B"}><a href='#' onClick={() => toggleTabs(3)}>랭크</a></span>
                <span className={toggleState === 4 ? "active_toggle" : "B"}><a href='#' onClick={() => toggleTabs(4)}>코발트</a></span>
              </div>
            </div>

            <div className='user_Infos'>
              <User_GameLog useData={userData} mostData={userData.mostpick} />
            </div>

            <div className='user_GameLog'>
              <div>
                {toggleState === 1 &&
                  <>
                    <Game_Nomal userLog={userLogNomal} />
                    <Game_Rank userLog={userLogRank} />
                    <Game_Cobart userLog={userLogCobart} />
                  </>}
                {toggleState === 2 &&
                  <>
                    <Game_Nomal userLog={userLogNomal} />
                  </>
                }
                {toggleState === 3 &&
                  <>
                    <Game_Rank userLog={userLogRank} />
                  </>}
                {toggleState === 4 &&
                  <>
                    <Game_Cobart userLog={userLogCobart} />
                  </>}
              </div>
            </div>
          </div>
          <>

          </>
        </>


      ) : (
        <div>
          <ErrorPage />
        </div>
      )
      }
      <>

      </>
    </div>
  )
}

export default UserinfoPage