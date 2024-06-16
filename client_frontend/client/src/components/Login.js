import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            username,
            password
        };

        axios.post("http://localhost:8080/api/employee/login", formData)
            .then((response) => {
                if (response.status === 200) {
                    document.cookie = `token=${response.data.token}; HttpOnly`;
                    console.log("Login successful");
                    navigate("/getemployees");
                } else {
                    setError("Incorrect Credentials");
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
                setError("Login failed. Please try again.");
            });
    };

    return (
        <center>
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Username :</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Password :</td>
                                <td>
                                    <input
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button type="submit">Login</button>
                                </td>
                            </tr>
                            {error && (
                                <tr>
                                    <td colSpan="2" style={{ color: "red", textAlign: "center" }}>
                                        {error}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </form>
            </div>
        </center>
    );
}

export default Login;
