import { useState, useEffect } from "react";
import api from "../api";
import AppointmentCard from "../components/AppointmentCard";


function AppointmentReview () {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        console.log("Before get call")
        const res = await api.get("/api/job/get_pending")
        console.log("after get call")
        console.log(res)
        setAppointments(res.data)
    }

    useEffect(() => {fetchAppointments()}, [])

    const handleRemoveAppointment = (id) => {
        // setAppointments((prev) => prev.filter((appt) => appt.id !== id))
        console.log("handleremove has been called!!")
    }


    return(
        <>
            <h1 style={{marginTop: "80px", textAlign: "center"}}>Review your appointments below for scheduling</h1>
            <div
                style={{
                    marginTop: "32px",
                    display: "grid",
                    gap: "24px",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    alignItems: "stretch"
                }}
            >
                {appointments.map((appointment, index) => (
                    <AppointmentCard
                        key={appointment.id ?? appointment.email ?? index}
                        data={appointment}
                        onApproved={handleRemoveAppointment}
                    />
                ))}
            </div>
        </>
    )
}

export default AppointmentReview
