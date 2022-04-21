import React, { useEffect, useState } from 'react'
import './UserInfoPage.css'
import UserInfo from './Section/UserInfo'
import Pentagon from './Section/Pentagon'
import queryString from 'query-string'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import { useParams } from 'react-router-dom';

function UserinfoPage() {

  const { nickname } = useParams();
  const [userData, setUserData] = useState([])
  const [array, setArray] = useState(["MOn","mose", "Lost","lai","mia"]);



  useEffect(() => {
    try {
      axios.get(
        'http://127.0.0.1:8000/api/UserGame/' + nickname + '/')
        .then(response => {
          setUserData(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [])


  console.log(userData)

  return (
    <div className='page_wrap'>
      <header className='headers'>
        <div className='user_name'>
          {nickname}
        </div>
      </header>
      <div className='average_content'>
        <div>MainBlock</div>
        <div className='user_average'>
          <Pentagon />
        </div>
      </div>
      <div className='users_Content'>
        <div className='user_info'>
          {userData && userData.map(item => (
            <div className={item.id}>
              <div className='first'>
                <div>{item.id}</div>
                <div>{item.season}</div>
                <div>6시간 전</div>
              </div>
              <div className='second'>
                <div className='char'></div>
                <div>무기 스킬</div>
              </div>
              <div className='third'>
                <div>K/A/H</div>
                <div>{item.Kills}{item.Assistants}</div>
              </div>
              <div className='forth'>
                <div>MMR</div>
                {item.mmr}
                <div>2,111</div>
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
    </div>
  )
}

export default UserinfoPage