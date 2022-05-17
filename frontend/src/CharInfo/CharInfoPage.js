// import React,{useState} from 'react'
// import './CharInfoPage.css'
// import MainInfo from './Section/MainInfo'
// import Char_Ability from './Section/Char_Ability'

// function CharInfoPage() {
//     const [searchKeyword , setSearchKeyword] = useState("")

//     const handleChangeEvent = (e) => {
//         setSearchKeyword(e.target.value);
//     }

//     return (
//         <> 
//         <div className='molaa'>
//             <div className='charInfoPage'>
//                 <div className='search_Char'>
//                     <div style={{height:"30px"}}>
//                         <input className="search_input" placeholder='실험체 이름' value={searchKeyword} onChange={(e) => handleChangeEvent(e)} />
//                         <img className='searchImg' />
//                     </div>
//                     <div className='select_Char'>
//                         <img className='most_img' src={require("../image/Char/icon/Yuki.png")} />
//                         <div className='most_name'>유키</div>
//                     </div>
//                   </div>  
//                 <div className='char_Info'>
//                     <div className='charMain_Info'>
//                         <MainInfo />
//                     </div>
//                     <div className='char_Ability'>
//                         <Char_Ability />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// export default CharInfoPage