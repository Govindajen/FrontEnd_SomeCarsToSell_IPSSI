import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import moment from "moment";

import './login.css'

export default function Login() {
    const navigate = useNavigate()

    const [loginPage, setLoginPage] = useState(true)
    const [username, setUsername] = useState("PincoPallo200")
    const [email, setEmail] = useState("example@email.com")
    const [password, setPassword] = useState("password")
    const [errorMessage, setErrorMessage] = useState("")


    const token = localStorage.getItem('token');


    const handleSubmitLogin = () => {

        console.log(email, password)
        if (email !== "" && password !== "") {
            axios.post("http://localhost:3001/login", {
                email: email,
                password: password
            }).then((response) => {
                if (response.data.result) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("username", response.data.username)
                    navigate("/home")
                } else {
                    setErrorMessage(response.data.error)
                }
            }).catch((error) => {
                setErrorMessage(error.respose.data.error)
            })
        }
    }

    const handleSubmitRegister = () => {
        if (email !== "" && password !== "") {
            axios.post("http://localhost:3001/register", {
                username: username,
                email: email,
                password: password,
                createAt: moment()
            }).then((response) => {
                if (response.data.result) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("username", response.data.username)
                    navigate("/home")
                } else {
                    setErrorMessage(response.data.error)
                }
            }).catch((error) => {
                setErrorMessage(error.respose.data.error)
            })
        }
    }

    useEffect(() => {
        if(token) {
            window.location.assign("/home");
        }
    }, [token])
    

    return (
        <>
            {loginPage ? (
                <div className="loginContainer">
                    <h1>Login</h1>
                    <div className="inputContainer">
                        <input 
                            className="inputLogin" 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            className="inputLogin" 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    {errorMessage !== "" && <p className="errorMessage">{errorMessage}</p>}
                    <button className="btn" onClick={handleSubmitLogin}>Login</button>
                    <button className="btn" onClick={() => setLoginPage(!loginPage)}>Create a new account</button>
                </div>
            ) : (
                <div className="loginContainer">
                    <h1>Register</h1>
                    <div className="inputContainer">
                        <input 
                            className="inputLogin" 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            className="inputLogin" 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            className="inputLogin" 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    {errorMessage !== "" && <p className="errorMessage">{errorMessage}</p>}
                    <button className="btn" onClick={handleSubmitRegister}>Register</button>
                    <button className="btn" onClick={() => setLoginPage(!loginPage)}>Already registered? Connect here</button>
                </div>
            )}
        </>
    )
}
