import React ,{useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'
import Eriwa_Logo from '../image/Logo/MainLogo.png'
import './Headers.css'
import axios from 'axios'

function Headers() {

  const [nickName , setUserInput] = useState("");

  const navigate = useNavigate("");

  const handleChangeInput = (e) => {
    setUserInput(e.target.value)
  }

  // const getUserGame = () => {
  //   try {
  //     axios.get(
  //       'http://127.0.0.1:8000/api/UserGameRecord/' + nickname + '/')
  //       .then(response => {
  //         console.log(response)
  //         setUserRecode(response.data);
  //       })
  //       .catch(error => {
  //         setUserError(true)
  //       })
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const handleMainClick = () =>{
    navigate("/")
  }

  const handleEnterInput = (e) => {
    if (e.key === 'Enter') {
        handleUserInfoClick();
    }
}

  const handleUserInfoClick = (e) => {
    navigate(`/userInfo/${nickName}`)
                
}

  return (
    <Navbar className="top_logo" collapseOnSelect expand="lg" variant="dark">
      <Container style={{height : 60 , fontSize : 18}}>
        <Navbar.Brand className="img_logo" onClick={handleMainClick}><img src={Eriwa_Logo} /></Navbar.Brand>
        <Navbar.Toggle   aria-controls="responsive-navbar-nav" style={{width:"50px",height:"40px",marginTop:"-20px"}} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link  href="#features" style={{color:"#D5D7D8" ,marginRight:"5px"}} >실험체 정보</Nav.Link>
            <Nav.Link  href="#features" style={{color:"#D5D7D8" , marginRight:"5px"}} >루트</Nav.Link>
            <Nav.Link  href="#features" style={{color:"#D5D7D8"}} >
              우린 왜 2등을 했을까?
              <span style={{fontSize:"14px",marginLeft:"5px",color:"skyblue"}}>
                
                </span>
              </Nav.Link>
          </Nav>
          <Nav >
            <Nav.Link href="#" className='searchForm'>
              <form onKeyPress={handleEnterInput}>
                <input onChange={(e) => handleChangeInput(e)} value={nickName}  />
                <img src={require("../image/Logo/EriwaLogo.png")} onClick={(e) => handleUserInfoClick(e)} />
              </form>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Headers