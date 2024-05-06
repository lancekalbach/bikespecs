import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props) {
    const storedUser = localStorage.getItem("user")
    const initState = {
        user: JSON.parse(storedUser) || {},
        token: localStorage.getItem('token') || "",
        bikes: [],
        allBikes: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [allBikes, setAllBikes] = useState([])
    const [bikes, setBikes] = useState([])

    //Signup
    function signup(credentials){
        axios.post("/auth/signup", credentials)
          .then(res => {
            const { user, token } = res.data
            console.log("Received user:", user)
            console.log("Received token:", token)
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
              ...prevUserState,
              user,
              token
            }))
          })
          .catch(err => handleAuthErr(err.response.data.errMsg))
      }

//Login
function login(credentials){
    axios.post("auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        //getUserBikes()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  //Logout/Navigate to login page
  const navigate = useNavigate()
  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
    })
    navigate('/')
  }

  function handleAuthErr(errMsg){
    setUserState(prevState => ({
        ...prevState,
        errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prevState => ({
        ...prevState,
        errMsg: ""
    }))
  }

  //Start bike context here
  
  //get all bikes
  function getAllBikes() {
    userAxios.get('/api/bike/getAll')
    .then(res => {
        setAllBikes(res.data)
    })
    .catch(err => console.log(err))
  }

  //Get everything
  const updateBikes = (newBikes) => {
    setBikes(newBikes)
  }

  function getEverything() {
    userAxios.get('/api/bike/getAll')
    .then(res => updateBikes(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getEverything()
  }, [])

  console.log(allBikes)

  //Getting the users posted bikes
  function getUserBikes() {
    userAxios.get('/api/bike/user')
    .then(res => {
        setUserState(prevState => ({
          ...prevState,
          bikes: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  //searching stuff goes here
  const [filteredBikes, setFilteredBikes] = useState([])

  const handleSearch = async (query) => {
    try {
      const response = await userAxios.get(`/api/bike/search?query=${query}`)
      setFilteredBikes(response.data)
    } catch (err) {
      console.error('Error searching bikes:', err)
    }
  }

  //Adding new bikes and their information 
  // Add new bike with PDF upload
async function addBike(bikeData) {
  try {
      const formData = new FormData();
      formData.append('pdf', bikeData.pdf)
      delete bikeData.pdf
      Object.entries(bikeData).forEach(([key, value]) => {
          formData.append(key, value)
      })
      const response = await userAxios.post('/api/bike', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
      console.log('addBike context', response.data)
      setUserState(prevState => ({
          ...prevState,
          bikes: [...prevState.bikes, response.data],
          allBikes: [...prevState.allBikes, response.data],
      }));
  } catch (err) {
      console.error('Error adding bike:', err)
      throw err
  }
}



  return (
    <UserContext.Provider 
        value={{
            ...userState,
            signup,
            login,
            logout,
            addBike,
            resetAuthErr,
            getUserBikes,
            handleSearch,
            getAllBikes,
            bikes, allBikes, filteredBikes
        }}>
        { props.children }
        </UserContext.Provider>
  )

}

const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
      throw new Error('useUser must be used within a UserProvider')
    }
    return context
  }


  export { useUser }