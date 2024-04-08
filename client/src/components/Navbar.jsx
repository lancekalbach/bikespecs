import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/nav.css'

export default function Navbar(props){
  const { logout } = props
  return (
    <div className="navbar">
      <Link className='profile-link' to="/profile">All Bikes</Link>
      <Link className='search-link' to="/search">Search</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}