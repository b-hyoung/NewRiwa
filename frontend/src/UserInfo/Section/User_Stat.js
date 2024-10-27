import React,{useState,useEffect} from 'react'
import './css/User_Stat.css'
import Form from 'react-bootstrap/Form'
import axios from 'axios';


//    <div style={{fontWeight:"bold" , textAlign:"center"}}>" ENFJ 형 "</div>
// <div>싸움은 안하고 곰먹으러다니는거를 좋아하며 딜은 못넣는데 킬은 잘줏어먹는다</div>
// <div>동물 애호가 : 동물이 가여워서 최소한의 살육을 하며 필요한 아이템은 인간으로 충당함</div>
// <div>아무말 : 내가지금 뭘써야할지모르겟어서 대충 쓰고있음</div>
// <div>간디쉑 : 세 개 까진 있엇으면 좋겟는데 똑같이 뭘 써야할지 모르겟음</div>

function User_Stat({useData,name , infoTier}) {

  const [selectTier, setSelectTier] = useState("1");
  const [tierData, setTierData] = useState("");
  const [testData, setTestData] = useState("");
  const [boole , setBoole] = useState(true)

  const handleSelectClick = (e) => {
    console.log(e.target.value)
    setSelectTier(e.target.value)
  }

  useEffect(() => {
    postTeamMode1()
    postTeamMode2()
    postTeamMode3()
  }, [boole])
  

  useEffect(() => {
    setTestData(useData);
  },[useData])

  useEffect(() => {
    getSelTier();
  },[selectTier])

  const getSelTier = () =>{
    // try {
    //   axios.get(
    //     'http://127.0.0.1:8000/api/UserInfo/'+name+'/?matchingTeamMode='+selectTier
    //     , {
    //     },
    //   )
    //     .then(response => {
    //       console.log(response.data)
    //       setTestData(response.data)
    //     })
    //     .catch(response => {
          
    //       console.log("이거에러임? 222")
    //     })
    // } catch (error) {
    //   console.log(error)
    //   console.log("이거에러임?")
    // }
  }
//솔로 정보불러오기
  const postTeamMode1 = () => {
    // try{
    //   axios.post(
    //     'http://127.0.0.1:8000/api/UserInfo/?matchingTeamMode=1',
    //     {
    //       nickname:name
    //     },
    //   ).then(
    //     setBoole(false)
    //   )
    // }catch(error){

    // }
  }

  //듀오 정보 불러오기
  const postTeamMode2 = () => {
    // try{
    //   axios.post(
    //     'http://127.0.0.1:8000/api/UserInfo/?matchingTeamMode=2',
    //     {
    //       nickname:name
    //     },
    //   ).then(
    //     setBoole(false)
    //   )
    // }catch(error){

    // }
  }

  //스쿼드 정보 불러오기
  const postTeamMode3 = () => {
    // try{
    //   axios.post(
    //     'http://127.0.0.1:8000/api/UserInfo/?matchingTeamMode=3',
    //     {
    //       nickname:name
    //     },
    //   ).then(
    //     setBoole(false)
    //   )
    // }catch(error){

    // }
  }

  // const getSelTier = () =>{
  //   if(selectTier === 1){
  //     setTierData("솔로 데이터")
  //   }else if(selectTier === 2){
  //     selectTier("듀오 데이터")
  //   }else if(selectTier === 3){
  //     selectTier("스쿼드 데이터")
  //   }
  // }

  // const graph = () => {
  //   티어평균값=(내데미지/티어평균데미지 * 100)/2; 
  // }


  return (
    <>
      <div className='userTier'>
        <div className='select_mode'>
                <Form.Select className='selected_tier' onChange={(e) => handleSelectClick(e)}>
                  <option value="1" className= {selectTier === "1" ? "selectTier" : "un_selected" } >솔로 랭크</option>
                  <option value="2" className= {selectTier === "2" ? "selectTier" : "un_selected" } >듀오 랭크</option>
                  <option value="3" className= {selectTier === "3" ? "selectTier" : "un_selected" } >스쿼드 랭크</option>
                </Form.Select>
        </div>
        <div className='img_Box'>
          <img src={process.env.PUBLIC_URL + '/image/Tier/Platinum.png'} />
        </div>
        <img className='char' src={`${process.env.PUBLIC_URL}/image/Char/Full/charhalf_028_Sua.png`} />
        <div className='avg_Info' style={{position:"relative",top:""}}>
          <div style={{marginBottom:"15px" ,width:"100%"}}>
            <div>
              김밥님
            </div>
            <div>
            { selectTier === "1" && (
              <>
                <div>Platinum ll - 32 LP</div>
              </>
            )}
            {testData && selectTier === "2" && (
              <>
                <div>{testData.duoTier}LP</div>
              </>
            )}
            {testData && selectTier === "3" && (
              <>
                <div>{testData.squadTier}LP</div>
              </>
            )}
            </div>
          </div>

          <div className='info_bar'>
          <div style={{ width: "180px" }}>
            게임 수
            <span className='info_log'>
              25 Games
            </span>
            <div className='gameBar'>
              <div style={{ width: "30%", height: "8px", backgroundColor: "#9FC131", borderRadius: "50px" }}>

              </div>
            </div>
          </div>
          <div>
            승률
            <span className='info_log'>
              4.86%
            </span>
            <div className='gameBar'>
              <div style={{ width: "70%", height: "8px", backgroundColor: "rgb(070,163,210)", borderRadius: "50px" }}>
              </div>
            </div>
          </div>

          <div>
            평균 순위
            <span className='info_log'>
              # 3.6
            </span>
            <div className='gameBar'>
              <div style={{ width: "50%", height: "8px", backgroundColor: "rgb(070,163,210)" ,borderRadius: "50px" }}>

              </div>
            </div>
          </div>

          <div>
            평균 킬
            <span className='info_log'>
             4.2 Kills
            </span>
            <div className='gameBar'>
              <div style={{ width: "60%", height: "8px", backgroundColor: "rgb(251,194,044)", borderRadius: "50px" }}>

              </div>
            </div>
          </div>
          <div>
            평균 데미지
            <span className='info_log'>
              14,867
            </span>
            <div className='gameBar'>
              <div style={{ width: "60%", height: "8px", backgroundColor: "rgb(070,163,210)" ,borderRadius: "50px" }}>

              </div>
            </div>
          </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default User_Stat