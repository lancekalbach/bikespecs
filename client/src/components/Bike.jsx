import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider.jsx'
import axios from 'axios'
import '../styles/bike.css'
import { pdfjs } from 'react-pdf'
import PdfComp from './PdfComp.jsx'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function Bike(props) {
    const [isClicked, setIsClicked] = useState(false)
    const [pdfFile, setPdffile] = useState(null)
    const { bike } = props
    const { user } = useContext(UserContext)

    const handleClick = () => {
        setIsClicked(!isClicked)
        setPdffile(bike.pdf)
    }

    const handleClose = () => {
        setIsClicked(false)
        setPdffile(null)
    }

    return (
        <div className='bike-list'>
            <div key={bike._id} className='bike-list-bike' onClick={handleClick}>
                {/* <h2>{user.username}'s bike submission</h2> */}
                <h3 className='bike-list-year'>{bike.year}</h3>
                <h3 className='bike-list-brand'>{bike.brand}</h3>
                <h3 className='bike-list-model'>{bike.model}</h3>
                {bike.imge ? (
                    <img className='bike-list-image' src={bike.imge} alt="Bike Image" />
                ) : null}
            </div>
            {isClicked && (
            <div class="overlay" onClick={handleClose}>
                <div class="popup-container" onClick={(e) => e.stopPropagation()}>
                    <span class="close-btn" onClick={handleClose}>&times;</span>
                    <div class="popup-content">
                        <div className="popup">
                            <h3 className='bike-list-year'>{bike.year}</h3>
                            <h3 className='bike-list-brand'>{bike.brand}</h3>
                            <h3 className='bike-list-model'>{bike.model}</h3>
                            <PdfComp pdfFile={pdfFile}/>
                            {/* <img className='bike-list-image' src={bike.imge} alt="Bike Image" /> */}
                        </div>
                    </div>
                </div>
            </div>
                
            )}
        </div>
    )
}
