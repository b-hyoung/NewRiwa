import React from 'react'
import axios from 'axios'

// 캐릭 클릭시 클릭한 값을 담아서 해당 캐릭터에 대한 값을 요청한다.
// 받아서 부모에서 자식값으로 보냄
// 해당값을 자식 컴포넌트에서 표현한다? 
// 부모값 get에 변화가 일어났을때 testCode에 있는 자식 값도 변화 하는가?
function testCode() {

    const [charStat, setCharStat ] = ([]);

    const getTestCom = () =>{
        axios.get("DB or Api ")
        .then(response) = () =>{
            setCharStat(response)
        }
    }

  return (
    <div>{charStat.name}</div>
  )
}

export default testCode