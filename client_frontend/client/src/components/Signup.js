import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            phone,
            department,
            role
        };

        axios.post("http://localhost:8080/api/employee/", formData)
            .then((response) => {
                console.log("User added successfully", response.data);
                setName("");
                setEmail("");
                setPhone("");
                setDepartment("");
                setRole("");
            })
            .catch((error) => console.error(error));
    };

    return (
        <center>
            <div className="signup-box">
                <h2>Add a New Employee</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <table style={{border:"none"}}>
                        <tbody>
                            <tr>
                                <td>Name :</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Email :</td>
                                <td>
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Phone :</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Enter Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Department :</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Enter Department"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Role :</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Enter Role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="submit" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </center>
    );
}

export default Signup;
