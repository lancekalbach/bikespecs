import React, { useState } from 'react';
import '../styles/bike.css';
import { useUser } from '../context/UserProvider'; // Adjust the path as needed

const initInputs = {
    year: "",
    model: "",
    bolt: "",
    location: "",
    torque: "",
    imge: "",
    pdf: null,
    author: {}
}

export default function BikeForm(props) {
    const [inputs, setInputs] = useState(initInputs);
    const { addBike, postPdf } = useUser(); // Assuming your provider exposes postPdf

    const handleFileChange = (e) => {
        setInputs(prevInputs => ({
            ...prevInputs,
            pdf: e.target.files[0], // Store the selected PDF file
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload PDF file first
        if (inputs.pdf) {
            try {
                const pdfData = await postPdf(inputs.pdf);
                // Assuming your backend returns the PDF path or ID
                setInputs(prevInputs => ({
                    ...prevInputs,
                    pdf: pdfData.path, // Update the PDF field with the path returned from backend
                }));
            } catch (error) {
                console.error('Error uploading PDF:', error);
                // Handle error (e.g., show an error message)
                return;
            }
        }

        // Add bike information
        addBike(inputs);
        setInputs(initInputs);
    }

    const { year, model, bolt, location, torque, imge } = inputs;

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
