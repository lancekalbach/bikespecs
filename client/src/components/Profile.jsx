import React, { useContext, useEffect, useState} from 'react'
import BikeList from './BikeList.jsx'
import { UserContext } from '../context/UserProvider.jsx'
import BikeForm from './BikeForm.jsx'
import PageLoading from './PageLoading.jsx'
import '../styles/profile.css'
import axios from 'axios'

export default function Profile() {

const [ isLoading, setIsLoading ] = useState(true)
const [hasPerms, setHasPerms] = useState(false);

    useEffect(() => {
        axios.get('/auth/permissions')
        .then(response => {
            setHasPerms(response.data.hasPerms);
        })
        .catch(error => {
            console.error('Error fetching permissions:', error);
        });
    }, [])

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
    }, 2000)
  }, [])

  if (isLoading) {
    return <PageLoading />
  }

return (
    <div className='profile-div'>
        <h1 className="welcome-user">Welcome {username}!</h1>
        {/* <h4 className='construction-warning'>This is a test deploy,
        please be warned that there will be many changes coming to this application 
        as it is still in construction.
        Feel free to send any recommendations or 
        report any bugs to me at lancekalbach@gmail.com</h4> */}
        {hasPerms && (
            <>
                <h2 className='profile-h2'>Submit Bikes Here:</h2>
                <BikeForm addBike={addBike}/>
            </>
        )}
        <h3>All Submitted Bikes:</h3>
        <BikeList bikes={allBikes} />
    </div>
)
}