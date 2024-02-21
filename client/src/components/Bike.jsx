import React, { useContext } from 'react'
//import BikeForm from './BikeForm.jsx'
import { UserContext } from '../context/UserProvider.jsx'
import axios from 'axios'

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function Bike(props) {
    
    const { bike } = props
    const { user } = useContext(UserContext)

    return (
        <div className='bike-list'>
            <div key={bike._id} className='bike-list-bike'>
                {/* <h2>{user.username}'s bike submission</h2> */}
                <h3 className='bike-list-year'>{bike.year}</h3>
                <h3 className='bike-list-brand'>{bike.brand}</h3>
                <h3 className='bike-list-model'>{bike.model}</h3>
                <h3 className='bike-list-bolt'>{bike.bolt}</h3>
                <h3 className='bike-list-location'>{bike.location}</h3>
                <h3 className='bike-list-torque'>{bike.torque} NM</h3>
                {bike.imge ? (
                    <img className='bike-list-image' src={bike.imge} alt="Bike Image" />
                ) : null}
            </div>
        </div>
    )
}