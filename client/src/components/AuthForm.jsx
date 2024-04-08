import React from 'react'
import '../styles/auth.css'

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText,
    errMsg, 
    inputs: {
      username, 
      password
    } 
  } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"
        className='auth-input'/>
      <input 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"
        className='auth-input'/>
      <button className='log-btn'>{ btnText }</button>
      <p style={{color: "red"}}>{errMsg}</p>
    </form>
  )
}