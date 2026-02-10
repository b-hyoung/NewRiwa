import React, { useState , useEffect } from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router-dom'
import event_logo from '../image/Logo/EventLogo.png'
import axios from 'axios'
import { USER_INFO_API } from '../api/apiConfig';
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
        const storedHistory = JSON.parse(localStorage.getItem("historyName"));
        if (storedHistory !== null) {
            if (storedHistory.length > 1) {
                setHistoryArray(storedHistory.reverse());
            } else {
                setHistoryArray(storedHistory);
            }
        }
    }, []); // Empty dependency array to run once on mount



    const handleInputChange = (e) => {
        setNickName(e.target.value)
    }

    const handleEnterInput = (e) => {
        if (e.key === 'Enter') {
            handleUserInfoClick();
        }
    }

    const updateHistory = (newNickName) => {
        let updatedHistory = historyArray.filter(name => name !== newNickName); // Remove if already exists
        updatedHistory = [...updatedHistory, newNickName]; // Add to end

        // Apply size limit
        if (updatedHistory.length > 5) { // Limit to 5 entries (0-indexed length 6)
            updatedHistory = updatedHistory.slice(1); // Remove oldest
        }

        setHistoryArray(updatedHistory);
        localStorage.setItem("historyName", JSON.stringify(updatedHistory));
        return updatedHistory; // Return the final history (optional, but good for chaining)
    }



    // 현재 서버가없어서 에러가 뜨는 상태
    // 유저 닉네임 확인후 이동
    const handleUserInfoClick = () => {
        if (nickName.length > 0 && !nickName.includes(" ")) {
            // try {
            //     axios.post(
            //         USER_INFO_API.CREATE,
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
            updateHistory(nickName);
            navigate(`/userInfo/${nickName}`);
        } else if (nickName.includes(" ")) {
            alert("유저이름에 공백을 제거해주세요");
        } else {
            alert("유저 이름을 입력해주세요");
        }
    };

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
                <button className='MP_Name_submitBtn' onClick={handleUserInfoClick}>검색</button>
                <div className='MP_NameHistory'>
                    {(historyArray).map((item , index) => {
                        return(
                            <div className='History_NameList' key={item}>
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
                    쿠폰 목록
                </div>
                    {coupon.map((item,index) => {
                        return(
                            <>
                                {item.days >= 20201127 ? 
                                <>
                                    <div className='Cupon_Code' key={item.code} onClick={() => handleClickCopy(item.code)}>{item.code}</div>
                                </>
                                :
                                <>
                                    <div className='Cupon_Code_End' key={item.code} onClick={() => handleClickEnd(item.code)}>{item.code}</div>
                                </>
                                }
                            </>
                        )
                    })}
                     <div>
                        <button onClick={() => handleClickAddCupon()}>쿠폰 등록</button>
                     </div>
            </div>
        </div>
    )
}

export default MainPage