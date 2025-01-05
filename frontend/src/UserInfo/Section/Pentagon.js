import React, { useState, useEffect } from 'react'
import './css/pentagon.css'

//랭크의 기준은 무엇인가 ? 
{/*
                    solo , duo , squad 3개 squad만 존재하는 유형 솔로에만 존재하는 유형
                    킬 생존 헌트 무숙 딜량

                    solo : 
                        솔로형
                        1. 킬에 비례해서 딜량이 높거나 낮다
                        2. 킬에 비례하여 헌트가 높거나 낮다.
                             킬↑ 헌트↓ => 싸움을 좋아하는 유형 
                             킬↓ 헌트↑ => 싸움보다는 벽보고 성장하며 후반싸움을 좋아하는 유형 
                             킬↑ 헌트= => 킬이 높고 헌트가 평균면 뭐라쓸꺼임 평균치없애 ㅅㅂ?
                             킬↑ 헌트↑ => 개고수
                             킬↓ 헌트↓ => 개줫밥
                                킬이 높고 낮다는 어떤것에 평균점을 둘것인가
                                오브젝트를 챙기는 사람은 싸움을 좋아한다? //이클 , 오메가 
                                해당하는 칭호가 있엇으면 좋겟음 ex) 미친놈 : 킬은 개높은데 헌트가 낮음
                        3. 생존시간 비례해서 킬이 높거나 낮다.
                        4. 생존시간에 비하여 헌트가 높거나 낮다.
                        5. 
                    duo :
                        듀오형 

                    squad : 
                        스퀏형
                         
                <div className='avg_result'>
                    <div>
                        업둥이 형
                    </div>
                    <div>
                        
                    </div>
                </div>
                */}

function Pentagon({ name, infoTier, dataUser , usertier }) {
    // 닉네임 , 티어 , 순위 , 킬 , 가한피해량 , 무기숙련도 , 야생동물
    const [userInfo , setUserInfo ] = useState({
        nickName : "김밥님",
        tier : "Platinum",
        avgRank : "S",
        avgKill : "C",
        avgDamage : "A",
        avgWeapon : "B",
        avgHunt : "D"
    })

    //오각형 그래프 위치
    const [survTemp, setServTemp] = useState("2 , -78.75")
    const [killTemp, setKillTemp] = useState("78 , -27.5")
    const [demageTemp, setDemageTemp] = useState("35 ,  48.5")
    const [masteryTemp, setMasteryTemp] = useState("-19 ,  25")
    const [huntTemp, setHuntTemp] = useState(" -64.7 -21.0")


    //생존시간 , 판수 , 딜량 , 랭크
    // 등수 
    // const getSurviveRank = () => {
    //     if (infoTier.averageRanking / dataUser.averageRanking * 100 >= 150) {
    //         setuserInfo.avgRank("S")
    //     } else if (infoTier.averageRanking / dataUser.averageRanking * 100 >= 140) {
    //         setuserInfo.avgRank("A+");
    //     } else if (infoTier.averageRanking / dataUser.averageRanking * 100 >= 130) {
    //         setuserInfo.avgRank("A");
    //     } else if (infoTier.averageRanking / dataUser.averageRanking * 100 >= 115) {
    //         setuserInfo.avgRank("B+");
    //     } else if (infoTier.averageRanking / dataUser.averageRanking * 100 >= 100) {
    //         setuserInfo.avgRank("B");
    //     } else if (infoTier.averageRanking / dataUser.averageRanking * 100 >= 75) {
    //         setuserInfo.avgRank("C+");
    //     } else if (infoTier.averageRanking / dataUser.averageRanking * 100 >= 50) {
    //         setuserInfo.avgRank("C");
    //     } else if (infoTier.averageRanking / dataUser.averageRanking * 100 >= 25) {
    //         setuserInfo.avgRank("D");
    //     } else if (infoTier.averageRanking / dataUser.averageRanking * 100 <= 12.5) {
    //         setuserInfo.avgRank("F");
    //     }
    // }

    // //킬
    // const getKillRank = () => {
    //     if (dataUser.averageKills / infoTier.averageKills * 100 >= 150) {
    //         setuserInfo.avgDamage("S")
    //     } else if (dataUser.averageKills / infoTier.averageKills * 100 >= 140) {
    //         setuserInfo.avgDamage("A+");
    //     } else if (dataUser.averageKills / infoTier.averageKills * 100 >= 150) {
    //         setuserInfo.avgDamage("A");
    //     } else if (dataUser.averageKills / infoTier.averageKills * 100 >= 115) {
    //         setuserInfo.avgDamage("B+");
    //     } else if (dataUser.averageKills / infoTier.averageKills * 100 >= 100) {
    //         setuserInfo.avgDamage("B");
    //     } else if (dataUser.averageKills / infoTier.averageKills * 100 >= 75) {
    //         setuserInfo.avgDamage("C+");
    //     } else if (dataUser.averageKills / infoTier.averageKills * 100 >= 50) {
    //         setuserInfo.avgDamage("C");
    //     } else if (dataUser.averageKills / infoTier.averageKills * 100 >= 25) {
    //         setuserInfo.avgDamage("D");
    //     } else if (dataUser.averageKills / infoTier.averageKills * 100 <= 12.5) {
    //         setuserInfo.avgDamage("F");
    //     }
    // }

    // //데미지
    // const getDemageRank = () => {
    //     if (dataUser.averageDeal / infoTier.averageDeal * 100 >= 150) {
    //         setuserInfo.avgDamage("S")
    //     } else if (dataUser.averageDeal / infoTier.averageDeal * 100 >= 140) {
    //         setuserInfo.avgDamage("A+");
    //         console.log(dataUser.averageDeal + "유저입니다")
    //     } else if (dataUser.averageDeal / infoTier.averageDeal * 100 >= 150) {
    //         setuserInfo.avgDamage("A");
    //     } else if (dataUser.averageDeal / infoTier.averageDeal * 100 >= 115) {
    //         setuserInfo.avgDamage("B+");
    //     } else if (dataUser.averageDeal / infoTier.averageDeal * 100 >= 100) {
    //         setuserInfo.avgDamage("B");
    //     } else if (dataUser.averageDeal / infoTier.averageDeal * 100 >= 75) {
    //         setuserInfo.avgDamage("C+");
    //     } else if (dataUser.averageDeal / infoTier.averageDeal * 100 >= 50) {
    //         setuserInfo.avgDamage("C");
    //     } else if (dataUser.averageDeal / infoTier.averageDeal * 100 >= 25) {
    //         setuserInfo.avgDamage("D");
    //     } else if (dataUser.averageDeal / infoTier.averageDeal * 100 <= 12.5) {
    //         setuserInfo.avgDamage("F");
    //     }
    // }
    // const getMasteryRank = () => {
    //     if (dataUser.averageProficiency / infoTier.averageProficiency * 100 >= 150) {
    //         setForRank("S")
    //     } else if (dataUser.averageProficiency / infoTier.averageProficiency * 100 >= 140) {
    //         setForRank("A+");
    //     } else if (dataUser.averageProficiency / infoTier.averageProficiency * 100 >= 150) {
    //         setForRank("A");
    //     } else if (dataUser.averageProficiency / infoTier.averageProficiency * 100 >= 115) {
    //         setForRank("B+");
    //     } else if (dataUser.averageProficiency / infoTier.averageProficiency * 100 >= 100) {
    //         setForRank("B");
    //     } else if (dataUser.averageProficiency / infoTier.averageProficiency * 100 >= 75) {
    //         setForRank("C+");
    //     } else if (dataUser.averageProficiency / infoTier.averageProficiency * 100 >= 50) {
    //         setForRank("C");
    //     } else if (dataUser.averageProficiency / infoTier.averageProficiency * 100 >= 25) {
    //         setForRank("D");
    //     } else if (dataUser.averageProficiency / infoTier.averageProficiency * 100 <= 12.5) {
    //         setForRank("F");
    //     }
    // }
    // const getTestRank = () => {
    //     if (dataUser.averageHunts / infoTier.averageHunts * 100 >= 150) {
    //         setFifRank("S")
    //     } else if (dataUser.averageHunts / infoTier.averageHunts * 100 >= 140) {
    //         setFifRank("A+");
    //     } else if (dataUser.averageHunts / infoTier.averageHunts * 100 >= 150) {
    //         setFifRank("A");
    //     } else if (dataUser.averageHunts / infoTier.averageHunts * 100 >= 115) {
    //         setFifRank("B+");
    //     } else if (dataUser.averageHunts / infoTier.averageHunts * 100 >= 100) {
    //         setFifRank("B");
    //     } else if (dataUser.averageHunts / infoTier.averageHunts * 100 >= 75) {
    //         setFifRank("C+");
    //     } else if (dataUser.averageHunts / infoTier.averageHunts * 100 >= 50) {
    //         setFifRank("C");
    //     } else if (dataUser.averageHunts / infoTier.averageHunts * 100 >= 25) {
    //         setFifRank("D");
    //     } else if (infoTier.averageHunts / infoTier.averageHunts * 100 <= 12.5) {
    //         setFifRank("F");
    //     }
    // }

    const getSurviveCom = () => {
        if (userInfo.avgRank === "S") {
            setServTemp("0 , -90")
        } else if (userInfo.avgRank === "A+") {
            setServTemp("0 , -78.75")
        } else if (userInfo.avgRank === "A") {
            setServTemp("0,-67.5")
        } else if (userInfo.avgRank === "B+") {
            setServTemp("0 ,-56.25")
        } else if (userInfo.avgRank === "B") {
            setServTemp("0 ,-45")
        } else if (userInfo.avgRank === "C+") {
            setServTemp("0 -33.75")
        } else if (userInfo.avgRank === "C") {
            setServTemp("0 , -22.5 ")
        } else if (userInfo.avgRank === "D") {
            setServTemp("0 , -11.25")
        } else if (userInfo.avgRank === "F") {
            setServTemp("0 , 0")
        }
    }
    const getKillCom = () => {
        if (userInfo.userInfo.avgKill === "S") {
            setKillTemp("85.5 , -27.5")
        } else if (userInfo.avgKill === "A+") {
            setKillTemp("78 , -25")
        } else if (userInfo.avgKill === "A") {
            setKillTemp("64.5 , -21")
        } else if (userInfo.avgKill === "B+") {
            setKillTemp("52.5 , -17")
        } else if (userInfo.avgKill === "B") {
            setKillTemp("42  ,-13")
        } else if (userInfo.avgKill === "C+") {
            setKillTemp("31  , -10.5")
        } else if (userInfo.avgKill === "C") {
            setKillTemp("22 , -6 ")
        } else if (userInfo.avgKill === "D") {
            setKillTemp("12,-7")
        } else if (userInfo.avgKill === "F") {
            setKillTemp("0 , 0")
        }
    }
    const getDemageCom = () => {
        if (userInfo.avgDamage === "S") {
            setDemageTemp("53 , 73")
        } else if (userInfo.avgDamage === "A+") {
            setDemageTemp("47 ,  65")
        } else if (userInfo.avgDamage === "A") {
            setDemageTemp("40 ,  56")
        } else if (userInfo.avgDamage === "B+") {
            setDemageTemp("35 ,  48.5")
        } else if (userInfo.avgDamage === "B") {
            setDemageTemp("26 ,  36 ")
        } else if (userInfo.avgDamage === "C+") {
            setDemageTemp("18 ,  25")
        } else if (userInfo.avgDamage === "C") {
            setDemageTemp("12 ,  20 ")
        } else if (userInfo.avgDamage === "D") {
            setDemageTemp("5 ,  10")
        } else if (userInfo.avgDamage === "F") {
            setDemageTemp("0 , 0")
        }
    }
    const getMasteryCom = () => {
        if (userInfo.avgWeapon === "S") {
            setMasteryTemp("-53 ,  73")
        } else if (userInfo.avgWeapon === "A+") {
            setMasteryTemp("-49 ,  68")
        } else if (userInfo.avgWeapon === "A") {
            setMasteryTemp("-40 ,  57")
        } else if (userInfo.avgWeapon === "B+") {
            setMasteryTemp("-33 ,  47")
        } else if (userInfo.avgWeapon === "B") {
            setMasteryTemp("-26 ,  36")
        } else if (userInfo.avgWeapon === "C+") {
            setMasteryTemp("-19 ,  25")
        } else if (userInfo.avgWeapon === "C") {
            setMasteryTemp("-15 ,  17 ")
        } else if (userInfo.avgWeapon === "D") {
            setMasteryTemp("-6 ,  12")
        } else if (userInfo.avgWeapon === "F") {
            setMasteryTemp("0 , 0")
        }
    }
    const getHuntCom = () => {
        if (userInfo.avgHunt === "S") {
            setHuntTemp("-85.5 , -27.5")
        } else if (userInfo.avgHunt === "A+") {
            setHuntTemp("-75 , -24")
        } else if (userInfo.avgHunt === "A") {
            setHuntTemp("-64.7 ,  -21.0")
        } else if (userInfo.avgHunt === "B+") {
            setHuntTemp("-53 , -18")
        } else if (userInfo.avgHunt === "B") {
            setHuntTemp("-42 ,  -13")
        } else if (userInfo.avgHunt === "C+") {
            setHuntTemp("-31 , -10")
        } else if (userInfo.avgHunt === "C") {
            setHuntTemp("-20 , -6")
        } else if (userInfo.avgHunt === "D") {
            setHuntTemp("-10 , -5")
        } else if (userInfo.avgHunt === "F") {
            setHuntTemp("0 , 0")
        }
    }

    // useEffect(() => {
    //     getSurviveCom();
    //     getKillCom();
    //     getDemageCom();
    //     getMasteryCom();
    //     getTestCom();
    // }, [userInfo.avgRank])

    // useEffect(() => {
    //     getSurviveRank();
    //     getKillRank();
    //     getDemageRank();
    //     getMasteryRank();
    //     getTestRank();
    // }, [infoTier])

    return (
        <div className="pentagon">

            {/* Rank 
                  (top)             (t,r)             (b,r)          (b,l)                (t,l)
                  rank             kill            damage          weapon                hunt
                S  : 2 -90       S  : 85.5 -27.5    S  : 53 73     S  :  -53 73       S  : -85.5  -27.5
                A+ : 2 -78.75    A+ : 78 -25        A+ : 47 65     A+ : -49 68        A+ : -75   -24  
                A  : 2 -67.5     A  : 64.5 -21      A  : 40 56     A  : -40 57        A  : -64.7 -21.0
                B+ : 2 -56.25    B+ : 52.5 -17      B+ : 35 48.5   B+ : -33 47        B+ : -47   -15 
                B  : 2 -45       B  : 42 -13        B  : 26 36     B  : -26 36        B  : -42    -13  
                C+ : 2 -33.75    C+ : L31 -10.5     C+ : 18 25     C+ : -19 25        C+ : -31   -10    
                C  : 2 -22.5     C : 22 -6          C  : 12 20     C : -15 17         C : -20    -6
                D  : 2 -11.25    D  : 12,-7         D  : 5 10      D  : -6 12         D  : -10   -5 
                F  : 2 0         F : 0 0            F : 0 0        F : 0 0            F : 0     0   
                */}

            {userInfo.avgRank !== "" && (
                <>
                    <div className='rank_survive'>
                        <span className='rank'>{userInfo.avgRank}</span>
                        <span className='text_survive'>순위</span>
                    </div>
                    <div className='rank_kill'>
                        <span className='rank'>{userInfo.avgDamage}</span>
                        <span className='text_kill'>킬</span>
                    </div>
                    <div className='rank_demage'>
                        <span className='rank'>{userInfo.avgDamage}</span>
                        <span className='text_demage'>가한 피해량</span>
                    </div>
                    <div className='rank_mastery'>
                        <span className='rank'>{userInfo.avgWeapon}</span>
                        <span className='text_mastery'>무기 숙련도</span>
                    </div>
                    <div className='rank_test'>
                        <span className='rank'>{userInfo.avgHunt}</span>
                        <span className='text_test'>헌트</span>
                    </div>
                </>
            )}

            <div className='avg_tier'>
                <div className='colume'>
                    <div className='test_' style={{ backgroundColor: "orange" }}></div>
                    <div>
                    <span >{userInfo.tier}</span>
                    </div>
                </div>
                <div className='colume'>
                    <div className='test_' style={{ backgroundColor: "gray" }}></div>
                    <span style={{ width: "130px" }}>{userInfo.nickName}</span>
                </div>
            </div>
            <svg>
            <g>
                    <circle r="22.5px" opacity="0.2" transform="translate(115,115)" ></circle>
                    <circle r="45px" opacity="0.2" transform="translate(115,115)" ></circle>
                    <circle r="67.5px" opacity="0.2" transform="translate(115,115)" ></circle>
                    <circle r="90px" opacity="0.4"  transform="translate(115,115)" ></circle>
             
                    <line transform="translate(115,115)" x="0" y="0" x2="0" y2="-90" stroke='#bebebe' />
                    <line transform="translate(115,115)" x2="85.5" y2="-28" x="0" y="0" stroke='#bebebe' ></line>
                    <line transform="translate(115,115)" x2="53" y2="73" x="0" y="0" stroke='#bebebe'></line>
                    <line transform="translate(115,115)" x2="-53" y2="73" x="0" y="0" stroke='#bebebe' ></line>
                    <line transform="translate(115,115)" x2="-85.5" y2="-27.5" x="0" y="0" stroke='#bebebe' ></line>

                    <path d="M 0,-45 L42,-13 L26,36 L-26,36 L-42,-13.5 Z"  stroke='rgb(92,166,196)' fill='none' transform="translate(115,115)"></path>
                    <path d={"M " + survTemp + " L" + killTemp + " L" + demageTemp + " L" + masteryTemp + " L" + huntTemp + " Z"} stroke='rgb(119, 126, 88)' fill='rgb(161, 239, 255)' opacity="0.4" transform="translate(115,115)"></path>
                </g>
            </svg>
            {console.log(survTemp)}
        </div>
    )
}
export default Pentagon

