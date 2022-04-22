import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'
import Eriwa_Logo from '../image/4_.png'
import './Headers.css'

function Headers() {
  const navigate = useNavigate("");

  const handleMainClick = () =>{
    navigate("/")
  }
  return (
    <Navbar className="top_logo" collapseOnSelect expand="lg" variant="dark">
      <Container style={{height : 60 , fontSize : 18}}>
        <Navbar.Brand className="img_logo" onClick={handleMainClick}><img src={Eriwa_Logo} /></Navbar.Brand>
        <Navbar.Toggle   aria-controls="responsive-navbar-nav" style={{width:"50px",height:"40px",marginTop:"-20px"}} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link  href="#features" >랭킹</Nav.Link>
            <Nav.Link href="#pricing">루트</Nav.Link>
          </Nav>
          {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Headers