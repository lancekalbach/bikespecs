import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Auth from './components/Auth.jsx'
import Profile from './components/Profile.jsx'
import Search from './components/Search.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { UserContext } from './context/UserProvider.jsx'

export default function App() {
  const { token, logout } =useContext(UserContext)
  return (
    <div className="app">
      {token && <Navbar logout={logout}/>}
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/profile"/> : <Auth />}
        />
        <Route 
          path="/profile"
          element={<ProtectedRoute token={token}>
            <Profile/>
          </ProtectedRoute>}
        />
        <Route 
          path="/search"
          element={<ProtectedRoute token={token}>
            <Search/>
          </ProtectedRoute>}
        />
      </Routes>
    </div>
  )
}
