import React, { useState , useEffect } from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router-dom'
import event_logo from '../image/Logo/EventLogo.png'
import axios from 'axios'
import User_Stat from '../UserInfo/Section/User_Stat'

function MainPage() {
    const navigate = useNavigate("");
    const [nickName, setNickName] = useState("")
    const [historyArray , setHistoryArray] = useState([])
    const [coupon , setCopon] =useState([
        {
            code : "Welcome To Eriwa :)",
            days : 20201125
        },
        {
            code : "Good By Eriwa :|",
            days : 20201128
        }
    ])
    const [newCupon , setNewCupon] = useState()
    
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("historyName")) !== null){
            getHistoryList()
        }
        //로컬 스토리지 네임 히스토리 지워버려
        // localStorage.removeItem("historyName")
        DeleteOldHistory()
    })

    const getHistoryList = () => {
        const arr = JSON.parse(localStorage.getItem("historyName"))
        if(arr.length > 1){
            setHistoryArray(arr.reverse())
        }else{
            setHistoryArray(arr)
        }
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

    const DeleteOldHistory = (e) => {
        if(historyArray.length >= 6){
            historyArray.shift()
            localStorage.setItem("historyName",JSON.stringify(historyArray))
        }
    }

    // 현재 서버가없어서 에러가 뜨는 상태
    //유저 닉네임 확인후 이동
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

    //유저 히스토리 삭제
    const handleClickDelete = (DeleteUser) => {
        let ary = [...historyArray]
        const result = ary.filter((user) => user !== DeleteUser);
        setHistoryArray(result)
        localStorage.setItem("historyName",JSON.stringify(result))
        
    }    

    //쿠폰 코드 복사
    const handleClickCopy = async (couponCode) => {
        try { 
            await navigator.clipboard.writeText(couponCode);
            alert("쿠폰 코드를 복사했습니다")
        }catch(error){
            alert("현재 사용 불가능한 쿠폰입니다.")
        }
    }
    const handleClickEnd = (e) => {
        alert("이미 만료된 쿠폰입니다")
    }

    //쿠폰이 더 있어요 !
    const handleClickAddCupon = (e) => {
        let addCupon = window.prompt("유효 쿠폰을 입력해주세요")
        setNewCupon(addCupon)
        //서버에 보내기
        console.log(addCupon)

    }

    return (
        <div className='page_wrapper'>
            <div className='MP_Box'>
                <div className='MP_NameBox'>
                    <input className='MP_Name' onChange={(e)=> handleInputChange(e)} onKeyDown={handleEnterInput}/>
                </div>
                <button onClick={handleUserInfoClick}>검색</button>
                <div className='MP_NameHistory'>
                    {(historyArray).map((item , index) => {
                        return(
                            <div className='History_NameList'>
                                {item !== "" &&  (
                                    <>
                                    <span className='History_Name' onClick={(e) => navigate(`/userInfo/${item}`)}>
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
            <div className='Cupon_Box'>
                <div className='Cupon_Title'>
                    쿠폰 우마이
                </div>
                    {coupon.map((item,index) => {
                        return(
                            <>
                                {item.days >= 20201127 ? 
                                <>
                                    <div className='Cupon_Code' onClick={() => handleClickCopy(item.code)}>{item.code}</div>
                                </>
                                :
                                <>
                                    <div className='Cupon_Code_End' onClick={() => handleClickEnd(item.code)}>{item.code}</div>
                                </>
                                }
                            </>
                        )
                    })}
                     <div>
                        <button onClick={() => handleClickAddCupon()}>쿠폰이 더 있어요 !</button>
                     </div>
            </div>
        </div>
    )
}

export default MainPage