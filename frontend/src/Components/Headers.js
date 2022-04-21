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
        <Navbar.Brand onClick={handleMainClick}><img src={Eriwa_Logo} style={{ width:"200px" }} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">랭킹</Nav.Link>
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