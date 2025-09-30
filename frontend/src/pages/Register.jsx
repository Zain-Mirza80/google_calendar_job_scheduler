import {useState} from "react";
import api from "../api.js"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constants.js";
import { useNavigate } from "react-router-dom";

function Form() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const route = "/api/user/register/"
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res1 = await api.post("/api/user/register/", {username, password});
            const res2 = await api.post("/api/token/", {username, password});

            localStorage.setItem(ACCESS_TOKEN, res2.data.access)
            localStorage.setItem(REFRESH_TOKEN, res2.data.refresh)

            navigate("/home");

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogIn = () => {
        navigate("/");
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                
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
                <button type="submit" >Register</button>
            </form>
            <button onClick={handleLogIn}>Log In</button>
        </div>
    )
}




export default Form