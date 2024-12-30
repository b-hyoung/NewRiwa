import logo from './logo.svg';
import './App.css';
import { Route,Router, Routes } from 'react-router-dom';
import Headers from './Components/Headers'
import MainPage from './Main/MainPage'
import UserInfoPage from './UserInfo/UserInfoPage'
import React,{useState} from 'react'
import CharInfoPage from './CharInfo/CharInfoPage';

function App() {
  const [infoPage , setInfoPage] = useState(false)

  return (
    <>
      <Headers open={infoPage} />
      <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/charInfo" element={<CharInfoPage />} /> */}
          <Route path="/userInfo/:nickname" element={<UserInfoPage />} >
            </Route>
      </Routes>
    </>
  );
}

export default App;