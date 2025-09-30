import { useState, useEffect } from "react";
import api from "../api";


function Test () {
    return(
        <>
        <h1 style={{marginTop: "80px", textAlign: "center"}}>
            TOPFLOW SERVICES
        </h1>
        <form>
            <p>Full Name</p>
            <input></input>
            <p>Email</p>
            <input></input>
            <p>Mobile Number</p>
            <input></input>
            <br></br>
            <p>Address</p>
            <input></input>
            <p>Requested appointment date</p>
            <input></input>
            <p>Job Description: Briefly describe the job required</p>
            <input></input>
            <p>Please upload an image of the relevant issue if applicable</p>
            <input></input>
        </form>
        </>
    )
}

export default Test