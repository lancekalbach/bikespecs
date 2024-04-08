import React from 'react'
import Bike from './Bike.jsx'
import '../styles/bike.css'

export default function BikeList(props) {
    const { bikes } = props
    console.log("bikeList" , bikes)
    return (
        <div className='bike-list-profile'>
            { bikes.map(bike => <Bike bike={bike} key={bike._id} />) }
        </div>
    )
}

