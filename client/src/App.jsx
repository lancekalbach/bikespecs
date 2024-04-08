import React, { useContext, useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Auth from './components/Auth.jsx'
import Profile from './components/Profile.jsx'
import Search from './components/Search.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { UserContext } from './context/UserProvider.jsx'
// import PageLoading from './components/PageLoading.jsx'

export default function App() {
  const { token, logout } =useContext(UserContext)
  // const [ isLoading, setIsLoading ] = useState(true)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 3000)
  // }, [])

  // if (isLoading) {
  //   return <PageLoading />
  // }

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
