import React, { useState, useContext } from 'react'
import { UserContext, useUser } from '../context/UserProvider.jsx'

const SearchCode = () => {
    const [query, setQuery] = useState('')
    const { handleSearch } = useUser()

    const handleSearchClick = () => {
        handleSearch(query)
      }

    return (
        <div className='search-container'>
            
            <input 
                className='search-input'
                type="text" 
                placeholder='Search For Bikes:'
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
             />

            <button className='search-button'onClick={handleSearchClick}>Search</button>
        </div>
    )
}

export default SearchCode
