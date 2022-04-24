import React, { useEffect, useState } from 'react'
import './UserInfoPage.css'
import Pentagon from './Section/Pentagon'
import queryString from 'query-string'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import ErrorPage from './Section/ErrorPage'
import User_GameLog from './Section/User_GameLog'
import User_Stat from './Section/User_Stat'

function UserinfoPage() {

  const { nickname } = useParams();
  const [userData, setUserData] = useState([])
  const [userRecode, setUserRecode] = useState("")
  const [userRecodeImg, setUserRecodeImg] = useState("")
  const [useError, setUserError] = useState(false)


  useEffect(() => {
    getUserGame()
    getUserRecode()
  }, [])


  const getUserGame = () => {
    try {
      axios.get(
        'http://127.0.0.1:8000/api/UserGame/' + nickname + '/')
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          setUserError(true)
        })
    } catch (error) {
      console.error(error);
    }
  }
  const getUserRecode = () => {
    try {
      axios.post(
        'http://127.0.0.1:8000/api/Userdata/'
        ,{
          nickname : nickname
        },
        )
        .then(response => {
          setUserRecode(response.data)
          setUserRecodeImg(response.data.mostpick)
        })
        .catch(error => {
          setUserError(true)
        })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='page_wrap'>
      {useError === false ? (
        <>
          <header className='headers'>
            <img src={require("../image/Background/YukiSama.png")}  />
            {/* <img src={require("../image/Char/icon/Yuki.png")} style={{width:"200px", height:"200px"}} /> */}
            <div className='user_name'>
              {nickname}
            </div>
          </header>
          <div className='pentagon_content'>
            <div className='user_Stat'>
                  <Pentagon name={nickname}/>
                  <User_Stat name={userRecode} />
            </div>
            
          </div>
          <div className='user_Content'>
            <div className='user_Infos'>
              <User_GameLog useData={userData} />
            </div>

            <div className='user_GameLog'>
              {userData && Object.keys(userData).map(item => (
                <div className='user'>
                  <div className='first'>
                    <div style={{ fontWeight: "bold", fontSize: "20px" }}>#{userData[item].rank}</div>
                    <div>{userData[item].matchingMode}</div>
                    <div>6시간 전</div>
                  </div>
                  <div className='second'>
                    <div className='char'></div>
                    <div className='char_wephon'>무기 스킬</div>
                  </div>
                  <div className='third'>
                    <div style={{ fontSize: "15px" }}>K/A/H</div>
                    <div className='user_kah'>{userData[item].Kills}/{userData[item].Assistants}/{userData[item].Hunts}</div>
                  </div>
                  <div className='forth'>
                    <div>MMR</div>
                    <div>{userData[item].mmr}</div>
                  </div>
                  <div className='fifth'>
                    <div>Route</div>
                    <div>567655</div>
                  </div>
                  <div className='sixth'>
                    <div>아이템 1</div>
                    <div>아이템 2</div>
                  </div>
                  <div className='seventh'>
                    <button>버튼</button>
                  </div>
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