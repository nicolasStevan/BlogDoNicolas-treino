import './App.css'

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
//conponents
import Footer from './components/footer'
import Navbar from './components/navbar'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </div>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
