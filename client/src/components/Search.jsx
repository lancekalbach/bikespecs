import React, {useState, useContext, useEffect} from 'react'
import SearchCode from './SearchCode.jsx'
import { UserContext, useUser } from '../context/UserProvider.jsx'
import BikeList from './BikeList.jsx'
import '../styles/search.css'

export default function Search() {
   
    const { 
        user: { 
          username 
        }, 
        addBike,
        getAllBikes,
        allBikes,
      } = useContext(UserContext)

      const { filteredBikes } = useUser()

    return (
        <div className='search-results-container'>
            <SearchCode />
            {filteredBikes.length > 0 ? (
                filteredBikes.map((bike) => (
                    <div className='search-bikes' key={bike._id}>
                        <p className='bike-year'>{bike.year}&nbsp;</p>
                        <p className='bike-model'>{bike.model}&nbsp;</p>
                    </div>
                ))
            ) : (
                <p className='no-result-text'>No bikes match the search, please try again</p>
            )}
        </div>
    )
}