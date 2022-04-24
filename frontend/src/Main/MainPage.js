import React, { useState } from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router-dom'
import event_logo from '../image/Logo/EventLogo.png'
import axios from 'axios'

function MainPage() {
    const navigate = useNavigate("");
    const [nickName, setNickName] = useState("")
    const [userData, setUserData] = useState([])

    const handleInputChange = (e) => {
        setNickName(e.target.value)
    }

    const handleUserInfoClick = () => {
        if (nickName.length > 0) {
            try {
                axios.post(
                    'http://127.0.0.1:8000/api/UserGame/',
                    {
                        nickname: nickName
                    },
                    )
                    .then(function (response) {
                        navigate(`/userInfo/${nickName}`)
                     })
                    .catch(function (error) { 
                        navigate(`/userInfo/${nickName}`)
                        console.log(error)
                     });
            } catch (error) {
                console.error("에러가 이건가?"+error);
            }
        }
    }
    return (
        <div className='page_wrapper'>
            <div className='event_Logo'>
                <img src={event_logo} />
            </div>
            <div className='header'>
                <input placeholder='실험체 검색' onChange={handleInputChange} value={nickName} />
                <button onClick={handleUserInfoClick}>검색</button>
            </div>
        </div>
    )
}

export default MainPage