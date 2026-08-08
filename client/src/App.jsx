import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
          <Footer/>
      </Router>
    </div>
  )
}

export default App