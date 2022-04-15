import React from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router-dom'
import BaseImg from '../image/test_model.jpg'

function MainPage() {
    const navigate = useNavigate("");

    const handleUserInfoClick = () => {
        navigate("/userInfo")
    }

    return (
        <div className='page_wrapper'>
            <div className='header'>
                <input placeholder='실험체 검색' />
                <button onClick={handleUserInfoClick}>검색</button>
            </div>
        </div>
    )
}

export default MainPage