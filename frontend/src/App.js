import logo from './logo.svg';
import './App.css';
import { Route,Router, Routes } from 'react-router-dom';
import Headers from './Components/Headers'
import MainPage from './Main/MainPage'
import UserInfoPage from './UserInfo/UserInfoPage'
import React,{useState} from 'react'

function App() {
  const [infoPage , setInfoPage] = useState(false)

  return (
    <>
      <Headers open={infoPage} />
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/userInfo" element={<UserInfoPage />} />
      </Routes>
    </>
  );
}

export default App;
