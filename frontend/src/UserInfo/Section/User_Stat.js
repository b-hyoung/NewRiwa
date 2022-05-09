import React,{useState} from 'react'
import './css/User_Stat.css'
import Form from 'react-bootstrap/Form'


//    <div style={{fontWeight:"bold" , textAlign:"center"}}>" ENFJ 형 "</div>
// <div>싸움은 안하고 곰먹으러다니는거를 좋아하며 딜은 못넣는데 킬은 잘줏어먹는다</div>
// <div>동물 애호가 : 동물이 가여워서 최소한의 살육을 하며 필요한 아이템은 인간으로 충당함</div>
// <div>아무말 : 내가지금 뭘써야할지모르겟어서 대충 쓰고있음</div>
// <div>간디쉑 : 세 개 까진 있엇으면 좋겟는데 똑같이 뭘 써야할지 모르겟음</div>

function User_Stat() {

  const [selectTier , setSelectTier] = useState(1);
  const [TierData , setTierData] = useState("");

  const handleSelectClick = (e) => {
    console.log(e.target.value)
    setSelectTier(e.target.value)
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
                  <option value="1" >솔로 랭크</option>
                  <option value="2" >듀오 랭크</option>
                  <option value="3" >스쿼드 랭크</option>
                </Form.Select>
        </div>

        <div className='img_Box'>
          <img src={require("../../image/Tier/Platinum.png")} />
        </div>
        <div className='avg_Info'>
          <div style={{marginBottom:"15px" ,width:"100%"}}>
            <div>
              김밥님
            </div>
            <div>
            Platinum IV - 4LP
            </div>
          </div>
          <div style={{ width: "140px" }}>
            게임 수
            <span className='info_log'>
              25 Games
            </span>
            <div className='gameBar'>
              <div style={{ width: "40%", height: "7px", backgroundColor: "yellow", borderRadius: "2px" }}>

              </div>
            </div>
          </div>
          <div>
            승률
            <span className='info_log'>
              4.86%
            </span>
            <div className='gameBar'>
              <div style={{ width: "60%", height: "7px", backgroundColor: "yellow", borderRadius: "2px" }}>
              </div>
            </div>
          </div>
          <div>
            평균 킬
            <span className='info_log'>
              3.86 Kills
            </span>
            <div className='gameBar'>
              <div style={{ width: "100%", height: "7px", backgroundColor: "yellow", borderRadius: "2px" }}>

              </div>
            </div>
          </div>
          <div>
            평균 딜
            <span className='info_log'>
              10,238
            </span>
            <div className='gameBar'>
              <div style={{ width: "60%", height: "7px", backgroundColor: "yellow" ,borderRadius: "2px" }}>

              </div>
            </div>
          </div>
          <div>
            평균 등수
            <span className='info_log'>
              2.5 
            </span>
            <div className='gameBar'>
              <div style={{ width: "50%", height: "7px", backgroundColor: "yellow", borderRadius: "2px" }}>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User_Stat