import React, { useState , useEffect } from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router-dom'
import event_logo from '../image/Logo/EventLogo.png'
import axios from 'axios'
import User_Stat from '../UserInfo/Section/User_Stat'

function MainPage() {
    const navigate = useNavigate("");
    const [nickName, setNickName] = useState("")
    const [historyArray , setHistoryArray] = useState(["a"])
    const [ax,setAX] = useState([])

    
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("historyName")) !== null){
            getHistoryList()
        }
        //로컬 스토리지 네임 히스토리 지워버려
        // localStorage.removeItem("historyName")
    },[])

    const getHistoryList = () => {
        setHistoryArray(JSON.parse(localStorage.getItem("historyName")))
    }

    const handleInputChange = (e) => {
        setNickName(e.target.value)
    }

    const handleEnterInput = (e) => {
        if (e.key === 'Enter') {
            handleUserInfoClick();
        }
    }

    const addUser = (e) => {
        localStorage.setItem("historyName",JSON.stringify([...historyArray,nickName]))
    }

    // 현재 서버가없어서 에러가 뜨는 상태 
    const handleUserInfoClick = (e) => {
        if (nickName.length > 0 && nickName.includes(" ") ===false) {
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
                if(historyArray.length === 0 || historyArray.filter((user) => user === nickName).length === 0){
                    addUser()
                    navigate(`/userInfo/${nickName}`)
                }else{
                    const newArray = [
                        ...historyArray.filter((user) => user === nickName),
                        ...historyArray.filter((user) => user !== nickName)
                    ]
                    localStorage.setItem("historyName",JSON.stringify(newArray))
                    navigate(`/userInfo/${nickName}`)

                }
        }else if(nickName.includes(" ") === true){
            alert("유저이름에 공백을 제거해주세요")
        }
        else{
            alert("유저 이름을 입력해주세요")
            }
        }

    const handleClickDelete = (DeleteUser) => {
        let ary = [...historyArray]
        const result = ary.filter((user) => user !== DeleteUser);
        setHistoryArray(result)
        localStorage.setItem("historyName",JSON.stringify(result))
        
    }    
    return (
        <div className='page_wrapper'>
            <div className='MP_Box'>
                <div className='MP_NameBox'>
                    <input className='MP_Name' onChange={(e)=> handleInputChange(e)} onKeyDown={handleEnterInput}/>
                </div>
                <button onClick={handleUserInfoClick}>검색</button>
                <div className='MP_NameHistory'>
                    {historyArray.map((item , index) => {
                        return(
                            <div className='History_NameList'>
                                {item !== "" &&  (
                                    <>
                                    <span className='History_Name'>
                                        {item}
                                    </span>
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