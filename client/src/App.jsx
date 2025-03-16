import './index.css'
import Athletes from './pages/Athletes'
import Header from './components//Header/Header'
import Home from './pages/Home'
import { Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import Catalog from './pages/Catalog'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer/Footer'
import Profile from './pages/Profile'
import ProtectedRoute from './routes/ProtectedRoute'
import UnprotectedRoute from './routes/UnprotectedRoute'
import NotFound from './pages/NotFound'
import CreatePost from './components/CreatePost/CreatePost'
import DetailsPost from './components/DetailsPost/DetailsPost'
import EditProfile from './components/EditProfile/EditProfile'

function App() {

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/catalog' element={<Catalog />} />

            <Route element={<UnprotectedRoute/>}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute/>}>              
              <Route path='/profile' element={<Profile/>} />
              <Route path='/profile/edit/:id' element={<EditProfile/>} />
              <Route path='/athletes' element={<Athletes />} />
              <Route path='/catalog/create' element={<CreatePost />} />
              <Route path='/catalog/details/:id' element={<DetailsPost/>}/>
            </Route>

            <Route path='*' element={<NotFound />}/>

          </Routes>

        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
