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
        <div className='bike'>
            <div key={bike._id} className='bike-list-bike'>
                {/* <h2>{user.username}'s bike submission</h2> */}
                <h3>{bike.year}</h3>
                <h3>{bike.brand}</h3>
                <h3>{bike.model}</h3>
                <h3>{bike.bolt}</h3>
                <h3>{bike.location}</h3>
                <h3>{bike.torque} NM</h3>
            </div>
        </div>
    )
}