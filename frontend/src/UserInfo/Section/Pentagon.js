import React, { useState,useEffect } from 'react'
import './css/pentagon.css'

function Pentagon({name}) {
    const [survTemp, setServTemp] = useState("")
    const [killTemp, setKillTemp] = useState("")
    const [demageTemp, setDemageTemp] = useState("")
    const [masteryTemp, setMasteryTemp] = useState("")
    const [testTemp, setTestTemp] = useState("")

    const [firRank,setFirRank] =useState("A")
    const [senRank,setSenRank] =useState("C+")
    const [thiRank,setThiRank] =useState("B+")
    const [forRank,setForRank] =useState("S")
    const [fifRank,setFifRank] =useState("A")
    
    //생존시간 , 판수 , 딜량 , 랭크

    // const getSurviveRank = () => {
    //     if(유저생존평균값 > 골드생존평균값){
    //         setFirRank("S")
    //     }else if(유저값 > 평균값){
    //         setFirRank("A+");
    //     }else if(유저값 > 평균값){
    //         setFirRank("A");
    //     }else if(유저값 > 평균값){
    //         setFirRank("B+");
    //     }else if(유저값 > 평균값){
    //         setFirRank("B");
    //     }else if(유저값 > 평균값){
    //         setFirRank("C+");
    //     }else if(유저값 > 평균값){
    //         setFirRank("C");
    //     }else if(유저값 > 평균값){
    //         setFirRank("D");
    //     }else if(유저값 > 평균값){
    //         setFirRank("F");
    //     }
    // }
   /*
       const getKillRank = () => {
       if(유저킬평균값 > 골드킬평균값){
            setSenRank("S")
        }else if(유저값 > 평균값){
            setSenRank("A+");
        }else if(유저값 > 평균값){
            setSenRank("A");
        }else if(유저값 > 평균값){
            setSenRank("B+");
        }else if(유저값 > 평균값){
            setSenRank("B");
        }else if(유저값 > 평균값){
            setSenRank("C+");
        }else if(유저값 > 평균값){
            setSenRank("C");
        }else if(유저값 > 평균값){
            setSenRank("D");
        }else if(유저값 > 평균값){
            setSenRank("F");
        }
    }
    */
   /*
    const getDemageRank = () => {
        if(유저 데미지 평균값 > 골드데미지평균값){
            setThiRank("S")
        }else if(유저값 > 평균값){
            setThiRank("A+"");
        }else if(유저값 > 평균값){
            setThiRank("A");
        }else if(유저값 > 평균값){
            setThiRank("B+"");
        }else if(유저값 > 평균값){
            setThiRank("B");
        }else if(유저값 > 평균값){
            setThiRank("C+"");
        }else if(유저값 > 평균값){
            setThiRank("C");
        }else if(유저값 > 평균값){
            setThiRank("D");
        }else if(유저값 > 평균값){
            setThiRank("F");
        }
    }
    */
   /*
   const getMasteryRank = () => {
        if(유저마스터리평균값 > 골드마스터리평균값){
            setForRank("S")
        }else if(유저값 > 평균값){
            setForRank("A+");
        }else if(유저값 > 평균값){
            setForRank("A");
        }else if(유저값 > 평균값){
            setForRank("B+");
        }else if(유저값 > 평균값){
            setForRank("B");
        }else if(유저값 > 평균값){
            setForRank("C+");
        }else if(유저값 > 평균값){
            setForRank("C");
        }else if(유저값 > 평균값){
            setForRank("D");
        }else if(유저값 > 평균값){
            setForRank("F");
        }
    }
    */
   /*
   const getTestRank = () => {
        if(유저테스트 평균값 > 골드테스트평균값){
            setFitRank("S")
        }else if(유저값 > 평균값){
            setFitRank("A+");
        }else if(유저값 > 평균값){
            setFitRank("A");
        }else if(유저값 > 평균값){
            setFitRank("B+");
        }else if(유저값 > 평균값){
            setFitRank("B");
        }else if(유저값 > 평균값){
            setFitRank("C+");
        }else if(유저값 > 평균값){
            setFitRank("C");
        }else if(유저값 > 평균값){
            setFitRank("D");
        }else if(유저값 > 평균값){
            setFitRank("F");
        }
    }
    */

    const getSurviveCom = () => {
        if(firRank === "S") {
            setServTemp("0 , -90")
        }else if(firRank === "A+"){
            setServTemp("0 , -78.75")
        }else if(firRank === "A"){
            setServTemp("0,-67.5")
        }else if(firRank === "B+"){
            setServTemp("0 ,-56.25")
        }else if(firRank === "B"){
            setServTemp("0 ,-45")
        }else if(firRank === "C+"){
            setServTemp("0 -33.75")
        }else if(firRank === "C"){
            setServTemp("0 , -22.5 ")
        }else if(firRank === "D"){
            setServTemp("0 , -11.25")
        }else if(firRank === "F"){
            setServTemp("0 , 0")
        }
    }
    const getKillCom = () => {
        if(senRank === "S") {
            setKillTemp("85.5 , -27.5")
        }else if(senRank === "A+"){
            setKillTemp("78 , -25")
        }else if(senRank === "A"){
            setKillTemp("-64.5 , 21")
        }else if(senRank === "B+"){
            setKillTemp("52.5 , -17")
        }else if(senRank === "B"){
            setKillTemp("42  ,-13")
        }else if(senRank === "C+"){
            setKillTemp("31  , -10.5")
        }else if(senRank === "C"){
            setKillTemp("22 , -6 ")
        }else if(senRank === "D"){
            setKillTemp("12,-7")
        }else if(senRank === "F"){
            setKillTemp("0 , 0")
        }
    }
    const getDemageCom = () => {
        if(thiRank === "S") {
            setDemageTemp("53 , 73")
        }else if(thiRank === "A+"){
            setDemageTemp("47 ,  65")
        }else if(thiRank === "A"){
            setDemageTemp("40 ,  56")
        }else if(thiRank === "B+"){
            setDemageTemp("35 ,  48.5")
        }else if(thiRank === "B"){
            setDemageTemp("26 ,  36 ")
        }else if(thiRank === "C+"){
            setDemageTemp("18 ,  25")
        }else if(thiRank === "C"){
            setDemageTemp("12 ,  20 ")
        }else if(thiRank === "D"){
            setDemageTemp("5 ,  10")
        }else if(thiRank === "F"){
            setDemageTemp("0 , 0")
        }
    }
    const getMasteryCom = () => {
        if(forRank === "S") {
            setMasteryTemp("-53 ,  73")
        }else if(forRank === "A+"){
            setMasteryTemp("-49 ,  68")
        }else if(forRank === "A"){
            setMasteryTemp("-40 ,  57")
        }else if(forRank === "B+"){
            setMasteryTemp("-33 ,  47")
        }else if(forRank === "B"){
            setMasteryTemp("-26 ,  36")
        }else if(forRank === "C+"){
            setMasteryTemp("-19 ,  25")
        }else if(forRank === "C"){
            setMasteryTemp("-15 ,  17 ")
        }else if(forRank === "D"){
            setMasteryTemp("-6 ,  12")
        }else if(forRank === "F"){
            setMasteryTemp("0 , 0")
        }
    }
    const getTestCom = () => {
        if(fifRank === "S") {
            setTestTemp("-85.5 , -27.5")
        }else if(fifRank === "A+"){
            setTestTemp("-75 , -24")
        }else if(fifRank === "A"){
            setTestTemp("-64.7 ,  -21.0")
        }else if(fifRank === "B+"){
            setTestTemp("-47 , -15")
        }else if(fifRank === "B"){
            setTestTemp("42 ,  -13")
        }else if(fifRank === "C+"){
            setTestTemp("-31 , -10")
        }else if(fifRank === "C"){
            setTestTemp("-20 , -6")
        }else if(fifRank === "D"){
            setTestTemp("-10 , -5")
        }else if(fifRank === "F"){
            setTestTemp("0 , 0")
        }
    }

    useEffect(() => {
        // getSurviveRank();
        // getKillRank();
        // getDemageRank();
        // getMasteryRank();
        // getTestRank();
        getSurviveCom();
        getKillCom();
        getDemageCom();
        getMasteryCom();
        getTestCom();
    }, [])
    

    
    return (
        <div className="pentagon">
                {/* Rank 
                  (top)             (t,r)             (b,r)          (b,l)                (t,l)
                  First             Second            Third          Forth                Fifth
                S  : 2 -90       S  : 85.5 -27.5    S  : 53 73     S  :  -53 73       S  : -85.5  -27.5
                A+ : 2 -78.75    A+ : 78 -25        A+ : 47 65     A+ : -49 68        A+ : -75   -24  
                A  : 2 -67.5     A  : 64.5 -21      A  : 40 56     A  : -40 57        A  : -64.7 -21.0
                B+ : 2 -56.25    B+ : 52.5 -17      B+ : 35 48.5 B+ : -33 47        B+ : -47   -15 
                B  : 2 -45       B  : 42 -13        B  : 26 36     B  : -26 36        B  : 42    -13  
                C+ : 2 -33.75    C+ : L31 -10.5     C+ : 18 25     C+ : -19 25        C+ : -31   -10    
                C  : 2 -22.5     C : 22 -6          C  : 12 20     C : -15 17         C : -20    -6
                D  : 2 -11.25    D  : 12,-7         D  : 5 10      D  : -6 12         D  : -10   -5 
                F  : 2 0         F : 0 0            F : 0 0        F : 0 0            F : 0     0   
                */} 
                <div className='rank_survive'>
                    <span className='rank'>{firRank}</span>
                    <span className='text_survive'>평균 생존 시간</span>
                </div>
                <div className='rank_kill'>
                    <span className='rank'>{senRank}</span>
                    <span className='text_kill'>평균 킬</span>
                </div>
                <div className='rank_demage'>
                    <span className='rank'>{thiRank}</span>
                    <span className='text_demage'>가한 피해량</span>
                </div>
                <div className='rank_mastery'>
                    <span className='rank'>{forRank}</span>
                    <span className='text_mastery'>무기 숙련도</span>
                </div>
                <div className='rank_test'>
                    <span className='rank'>{fifRank}</span>
                    <span className='text_test'>테스트</span>
                </div>

                <div className='avg_tier'>
                    <div className='colume'>
                        <div className='test_' style={{backgroundColor:"gray"}}></div>
                        <span style={{width:"130px"}}>니 티어 평균</span>
                    </div>
                    <div className='colume'>
                        <div className='test_' style={{backgroundColor:"orange"}}></div>
                        <span style={{width:"130px"}}>{name}</span>
                    </div>
                </div>
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

            <svg>
            <g>
                <circle  r="22.5px" opacity="0.2"  transform="translate(125,125)" ></circle>
                <circle  r="45px"   opacity="0.2"  transform="translate(125,125)" ></circle>
                <circle  r="67.5px" opacity="0.2"  transform="translate(125,125)" ></circle>
                <circle  r="90px"   opacity="0.4"  transform="translate(125,125)" ></circle>

                <line transform="translate(125,125)"  x="0" y="0" x2="0" y2="-90" stroke='white' />
                <line transform="translate(125,125)" x2="85.5" y2="-28" x="0" y="0" stroke='white' ></line>
                <line transform="translate(125,125)" x2="53" y2="73" x="0" y="0" stroke='white'></line>
                <line transform="translate(125,125)" x2="-53" y2="73" x="0" y="0" stroke='white' ></line>
                <line transform="translate(125,125)" x2="-85.5" y2="-27.5" x="0" y="0" stroke='white' ></line>

                <path   d="M 2,-45 L42,-13 L26,36 L-26,36 L-42,-13.5 Z"  stroke='orange' fill='none' transform="translate(125,125)"></path>
                <path   d={"M "+survTemp+" L"+killTemp+" "+demageTemp+"   "+masteryTemp+"   "+testTemp+" Z"} stroke='aqua' fill='yellow' opacity="0.4" transform="translate(125,125)"></path>
            </g>
            </svg>
        </div>
    )
}
export default Pentagon