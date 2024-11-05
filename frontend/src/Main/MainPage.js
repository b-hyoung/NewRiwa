import React, { useState } from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router-dom'
import event_logo from '../image/Logo/EventLogo.png'
import axios from 'axios'
import User_Stat from '../UserInfo/Section/User_Stat'

function MainPage() {
    const navigate = useNavigate("");
    const [nickName, setNickName] = useState("")
    const [userData, setUserData] = useState([])
    const [history , setHistory] = useState(0)
    const [historyArray , setHistoryArray] = useState([])

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
                        // navigate(`/userInfo/${nickName}`)
                        setHistoryArray([...historyArray,nickName])
                        setHistory(history+1)
                    });
            } catch (error) {
                console.error("에러가 이건가?" + error);
            }
            }else{
            }
        }

    const handleClickDelete = (e) => {
        let ary = [...historyArray]
        ary[e] = historyArray.filter(user => e !== e)
        console.log(historyArray)
        console.log(e)
        setHistoryArray(ary)
    }    
    return (
        <div className='page_wrapper'>
            <div className='MP_Box'>
                <div className='MP_NameBox'>
                    <input className='MP_Name' onChange={(e)=> handleInputChange(e)} />
                </div>
                <button onClick={(e) => handleUserInfoClick(e)}>검색</button>
                <div className='MP_NameHistory'>
                    {historyArray.map((item , index) => {
                        return(
                            <div>
                                {item}
                                {item !== "" &&  (
                                    <>
                                    <button onClick={(e) => handleClickDelete(index)}>X</button>
                                    </>
                                )
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MainPage