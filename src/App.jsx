import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Authentication/login';
import Home from './pages/Home';
import './App.css'
import Wrapper from './components/Wrapper';

import CreateAnnounce from './components/Announce/createAnnounce';
import ModifyAnnounce from './components/Announce/modifyAnnounce';

import { AnnounceElement } from './components/Announce/announceCard';

function App({children}) {


  return (
    <div className="App">


      <BrowserRouter>
        <Routes>

          <Route path="/" element={
            <Wrapper>
              <Home />
            </Wrapper>
            } />

          <Route path="/home" element={
            <Wrapper>
              <Home />
            </Wrapper>
            } />

          <Route path="/home" element={
            <Wrapper>
              <Home />
            </Wrapper>
            } />

          <Route path="/newannounce" element={
            <Wrapper>
              <CreateAnnounce />
            </Wrapper>
            } />

          <Route path="/home/announce" element={
            <Wrapper>
              <AnnounceElement />
            </Wrapper>
            } />

          <Route path="/home/editannounce" element={
            <Wrapper>
              <ModifyAnnounce />
            </Wrapper>
            } />

          <Route path="/login" element={
              <Login />
            } />

        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
