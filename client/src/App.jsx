import { Routes, Route } from 'react-router'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

import Header from './components//Header/Header'
import Footer from './components/Footer/Footer'

import ProtectedRoute from './routes/ProtectedRoute'
import UnprotectedRoute from './routes/UnprotectedRoute'

import DetailsPost from './components/Posts/DetailsPost/DetailsPost'
import CreatePost from './components/Posts/CreatePost/CreatePost'
import EditPost from './components/Posts/EditPost/EditPost'


import AuthProvider from './provider/AuthProvider'
import './assets/css/index.css'
import Contact from './pages/Contact'
import AdminInbox from './pages/Inbox'

function App() {

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/contact' element={<Contact />} />

            <Route element={<UnprotectedRoute/>}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute/>}>              
              <Route path='/profile' element={<Profile/>} />

              <Route path='/catalog/create' element={<CreatePost />} />
              <Route path='/catalog/details/:id' element={<DetailsPost/>}/>
              <Route path='/catalog/edit/:id' element={<EditPost/>}/>

              <Route path='/inbox' element={<AdminInbox/>}/>
            </Route>

            <Route path='*' element={<NotFound />}/>

          </Routes>

        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
