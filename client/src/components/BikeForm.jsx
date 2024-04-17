import React, { useState } from 'react'
import '../styles/bike.css'

const initInputs = {
    year: "",
    model: "",
    bolt: "",
    location: "",
    torque: "",
    imge: "",
    pdf: "",
    author: {}
}

export default function BikeForm(props) {
    const [inputs, setInputs] = useState(initInputs)
    const {addBike} = props

    function handleChange(e) {
        const {name, value} = e.target
        setInputs (prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    } 

    function handleSubmit(e) {
        e.preventDefault()
        addBike(inputs)
        setInputs(initInputs)
    }

    const { year, model, bolt, location, torque, imge, pdf } = inputs

    return (
        <form onSubmit={handleSubmit} className='bike-form'>
        <input
            type="text"
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
        {/* <input
            type="text"
            name="bolt"
            value={bolt}
            onChange={handleChange}
            placeholder="The Bolt:"/>
        <input
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="Location of the Bolt:"/>
        <input
            type="text"
            name="torque"
            value={torque}
            onChange={handleChange}
            placeholder="Torque: "/> */}
        <input 
            type="text"
            name="imge"
            value={imge}
            onChange={handleChange}
            placeholder="Image Address:" />
        <input 
            type="text"
            name="pdf"
            value={pdf}
            onChange={handleChange}
            placeholder="PDF:" /> 
        <button className='bikeform-submit'>Submit Bike Information</button>
        </form>
    )
}