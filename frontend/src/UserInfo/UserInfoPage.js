import React, { useEffect, useState } from 'react'
import './UserInfoPage.css'
import UserInfo from './Section/UserInfo'
import Pentagon from './Section/Pentagon'
import queryString from 'query-string'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import ErrorPage from './Section/ErrorPage'
import User_GameLog from './Section/User_GameLog'

function UserinfoPage() {

  const { nickname } = useParams();
  const [userData, setUserData] = useState([])
  const [useError, setUserError] = useState(false)


  useEffect(() => {
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
  }, [])


  console.log(userData)
  return (
    <div className='page_wrap'>
      {useError === false ? (
        <>
          <header className='headers'>
            <div className='user_name'>
              {nickname}
            </div>
          </header>
          <div className='pentagon_content'>
            <div>MainBlock</div>
            <div className='user_Stat'>
              <Pentagon />
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