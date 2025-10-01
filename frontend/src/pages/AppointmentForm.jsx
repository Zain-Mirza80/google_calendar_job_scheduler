import { useState, useEffect } from "react";
import api from "../api";


function AppointmentForm () {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        datetime: "",
        description: "",
        image: null,
        // session: "3353ddsfgd",
        is_scheduled: false
    });

    function handleChange(e) {
        const {name, value, files} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    function handleSubmit() {
        console.log("Before handlesubmit")
        const res = api.post("/api/job/create", formData)
        console.log("After handlesubmit")
        console.log(res)
    }

    return(
        <>
        <h1 style={{marginTop: "80px", textAlign: "center"}}>
            TOPFLOW SERVICES
        </h1>
        <h2 style={{marginTop: "3px", textAlign: "center"}}>
            Please fill in the form below to book your appointment with Topflow Services:
        </h2>
        <form onSubmit={handleSubmit} onKeyDown={(e) => {if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") e.preventDefault();}}>
            <p>Full Name</p>
            <input name="name" type="text" value={formData.name} onChange={handleChange} required/>
            <p>Email</p>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required/>
            <p>Mobile Number</p>
            <input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required/>
            <br></br>
            <p>Address</p>
            <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}         // controls vertical size
                style={{ width: "100%" }} // make it stretch horizontally
                required
                />
            <p>Date & Time of Appointment</p>
            <input name="datetime" type="datetime-local" value={formData.datetime} onChange={handleChange} required/>
            <p>Job Description: Briefly describe the job required</p>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}         // controls vertical size
                style={{ width: "100%" }} // make it stretch horizontally
                required
                />
            <p>Please upload an image of the relevant issue if applicable</p>
            <input name="image" type="file" value={formData.image} onChange={handleChange}/>
            <br/>
            <br/>
            <button type="submit">Book Appointment</button>
        </form>
        </>
    )
}

export default AppointmentForm