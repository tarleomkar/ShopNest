import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About';
import ReturnPolicy from './pages/ReturnPolicy';
import Disclaimer from './pages/Disclaimer';
import Login from './pages/Login';
import Regiser from './pages/Regiser';
import ProductDetails from './pages/ProductDetails';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/return" element={<ReturnPolicy/>} />
            <Route path="/disclaimer" element={<Disclaimer/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Regiser/>} />
            <Route path='product/:id' element={<ProductDetails/>} />
          </Routes>
          <Footer/>
      </Router>
    </div>
  )
}

export default App