import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.jsx'
import { UserContext } from '../context/UserProvider.jsx'
import '../styles/auth.css'

const initInputs = { username: "", password: "" }

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className="auth-container">
      <h2 className='auth-text'>Please Login or Signup</h2>
      { !toggle ?
        <>
        <AuthForm 
          handleChange={handleChange}
          handleSubmit={handleLogin}
          inputs={inputs}
          btnText="Login"
          errMsg={errMsg}
        />
        <p className="auth-member" onClick={toggleForm}>Not a member?</p>
      </>
      :
        <>
        <AuthForm 
          handleChange={handleChange}
          handleSubmit={handleSignup}
          inputs={inputs}
          btnText="Sign up"
          errMsg={errMsg}
        />
        <p className="auth-member" onClick={toggleForm}>Already a member?</p>
      </>
      }
    </div>
  )
}