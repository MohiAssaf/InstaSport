import './App.css'
import Athletes from './pages/Athletes'
import Header from './components/Header'
import Home from './pages/Home'
import { Routes, Route } from 'react-router'
import Posts from './pages/Posts'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

function App() {
  

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/athletes' element={<Athletes />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>

        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
