import React, { useContext, useEffect} from 'react'
import BikeList from './BikeList.jsx'
import { UserContext } from '../context/UserProvider.jsx'
import BikeForm from './BikeForm.jsx'

export default function Profile() {
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