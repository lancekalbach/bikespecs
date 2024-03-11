import React, { useContext, useEffect, useState} from 'react'
import BikeList from './BikeList.jsx'
import { UserContext } from '../context/UserProvider.jsx'
import BikeForm from './BikeForm.jsx'
import PageLoading from './PageLoading.jsx'

export default function Profile() {

const [ isLoading, setIsLoading ] = useState(true)

    const {
        user: {
            username, _id
        },
        bikes,
        getUserBikes,
        addBike,
        allBikes,
        getAllBikes
    } = useContext(UserContext)


useEffect(() => {
    getAllBikes()
}, [])

useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  if (isLoading) {
    return <PageLoading />
  }

return (
    <div className='profile-div'>
        <h1 className="welcome-user">Welcome {username}!</h1>
        <h2 className='profile-h2'>Submit Bikes Here:</h2>
        <BikeForm addBike={addBike}/>
        <h3>All Submitted Bikes:</h3>
        <BikeList bikes={allBikes} />
    </div>
)
}