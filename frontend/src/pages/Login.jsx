import {useState} from "react";
import api from "../api.js"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constants.js";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post("/api/token/", {username, password});
            
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)

            navigate("/home");
                
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = () => {
        navigate("/register")
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                
                <p>Username</p>
                <input
                placeholder= "Username"
                value={username}
                onChange = {(e) => setUsername(e.target.value)}
                />

                <p>Password</p>
                <input
                placeholder= "Password"
                type="password"
                value={password}
                onChange = {(e) => setPassword(e.target.value)}
                />

                <br/>
                <br/>
                <button type="submit" >Login</button>
            </form> 
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}


export default Login