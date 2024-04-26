import React, { useState } from 'react'
import '../styles/bike.css'
import { useUser } from '../context/UserProvider'
const initInputs = {
    year: "",
    model: "",
    imge: "",
    pdf: null,
    author: {}
}

export default function BikeForm(props) {
    const [inputs, setInputs] = useState(initInputs)
    const { addBike, postPdf } = useUser()

    const handleFileChange = (e) => {
        setInputs(prevInputs => ({
            ...prevInputs,
            pdf: e.target.files[0],
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        let pdfPath = inputs.pdf
        if (inputs.pdf) {
            const pdfData = await postPdf(inputs.pdf)
            pdfPath = pdfData.path
        }

        const bikeData = { ...inputs, pdf: pdfPath }
        addBike(bikeData)
        setInputs(initInputs)
    } catch (error) {
        console.error('Error submitting bike information:', error)
    }
}


    const { year, model, imge } = inputs

    return (
        <form onSubmit={handleSubmit} className='bike-form'>
            <input
                type="number"
                name="year"
                value={year}
                onChange={handleChange}
                placeholder="Model Year:"/>
            <input
                type="text"
                name="model"
                value={model}
                onChange={handleChange}
                placeholder="Model of bike:"/>
            <input 
                type="text"
                name="imge"
                value={imge}
                onChange={handleChange}
                placeholder="Image Address:" />
            <input
                type='file' 
                name='pdf'
                accept='application/pdf'
                onChange={handleFileChange}
                placeholder="PDF File" />
            <button className='bikeform-submit'>Submit Bike Information</button>
        </form>
    )
}
