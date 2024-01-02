
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import { Container } from '@mui/material'

function App() {
  return (
    <>
        
        <Router>
        <Nav />
        <Container>
          <Routes>
           
              <Route path='blog/:id' element={<Blog />} />
              <Route path='user/:id' element={<Profile />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/login' element={<LogIn />}/>
              <Route path='/' element={<Home />}/>
            
          </Routes>
        </Container>
          
        </Router>
    </>
  )
}

export default App
