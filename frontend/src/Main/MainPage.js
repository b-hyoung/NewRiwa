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

    const handleEnterInput = (e) => {
        if (e.key === 'Enter') {
            handleUserInfoClick();
        }
    }

    const handleUserInfoClick = (e) => {
        if (nickName.length > 0) {
            e.preventDefault();
            try {
                axios.post(
                    'http://127.0.0.1:8000/api/UserInfo/',
                    {
                        nickname: nickName
                    },
                )
                    .then(function (response) {
                        navigate(`/userInfo/${nickName}`)
                        console.log("보내기 성공")
                    })
                    .catch(function (error) {
                        navigate(`/userInfo/${nickName}`)
                    });
            } catch (error) {
                console.error("에러가 이건가?" + error);
            }
        }
    }
    
    return (
        <div className='page_wrapper'>
            <div className='MP_Box'>
                <div className='MP_NameBox'>
                    
                    <div className='MP_Name'>김밥이 너무 맛있어요</div>
                </div>
            </div>
        </div>
    )
}

export default MainPage