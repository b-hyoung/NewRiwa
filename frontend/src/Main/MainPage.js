import React, { useState , useEffect } from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router-dom'
import event_logo from '../image/Logo/EventLogo.png'
import axios from 'axios'
import User_Stat from '../UserInfo/Section/User_Stat'

function MainPage() {
    const navigate = useNavigate("");
    const [nickName, setNickName] = useState("")
    const [reciveData, setReciveData] = useState(0)
    const [history , setHistory] = useState(0)
    const [historyArray , setHistoryArray] = useState(["a","b","c","d"])

    
    useEffect(() => {

    },[historyArray])

    const handleInputChange = (e) => {
        setNickName(e.target.value)
    }

    const handleEnterInput = (e) => {
        if (e.key === 'Enter') {
            handleUserInfoClick();
        }
    }

    const addUser = (e) => {
        setHistoryArray([...historyArray,nickName])
        setHistory(history+1)
    }

    // 현재 서버가없어서 에러가 뜨는 상태 
    const handleUserInfoClick = (e) => {
        if (nickName.length > 0) {
            e.preventDefault();
            // try {
            //     axios.post(
            //         'http://127.0.0.1:8000/api/UserInfo/',
            //         {
            //             nickname: nickName
            //         },
            //     )
            //         .then(function (response) {
            //             navigate(`/userInfo/${nickName}`)
            //             console.log("보내기 성공")
            //         })
            //         .catch(function (error) {
            //             // navigate(`/userInfo/${nickName}`)
            //         });
            //     } catch (error) {
                //         console.error("에러가 이건가?" + error);
                //     }
                if(historyArray.length === 0){
                    addUser()
                }
                else{
                    const newArray = [
                        ...historyArray.filter((user) => user === nickName),
                        ...historyArray.filter((user) => user !== nickName)
                    ]
                    setHistoryArray(newArray)
                    setNickName("")
                }
            }else{
                alert("유저 이름을 입력해주세요")
            }
        }

    const handleClickDelete = (DeleteUser) => {
        let ary = [...historyArray]
        const result = ary.filter((user) => user !== DeleteUser);
        setHistoryArray(result)
        
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
                                {item !== "" &&  (
                                    <>
                                        {item}
                                        <button onClick={(e) => handleClickDelete(item)}>X</button>
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