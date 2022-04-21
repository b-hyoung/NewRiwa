import React,{useState} from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router-dom'
import BaseImg from '../image/test_model.jpg'
import  event_logo from '../image/Eriwa.png'

function MainPage() {
    const navigate = useNavigate("");
    const [nickName,setNickName] = useState("")

    const handleInputChange = (e) => {
        setNickName(e.target.value)
    }

    const handleUserInfoClick = () => {
        navigate(`/userInfo/${nickName}`)
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