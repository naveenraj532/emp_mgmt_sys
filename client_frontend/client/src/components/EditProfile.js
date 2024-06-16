import React, { useState, useEffect } from "react";
import axios from "axios";

function EditProfile({ employeeId, onClose }) {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        role: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/employee/getbyid/${employeeId}`)
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8080/api/employee/update/${employeeId}`, employee)
            .then((response) => {
                onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={employee.name} onChange={handleChange} />
            <label>Email</label>
            <input type="email" name="email" value={employee.email} onChange={handleChange} />
            <label>Phone</label>
            <input type="text" name="phone" value={employee.phone} onChange={handleChange} />
            <label>Department</label>
            <input type="text" name="department" value={employee.department} onChange={handleChange} />
            <label>Role</label>
            <input type="text" name="role" value={employee.role} onChange={handleChange} />
            <button type="submit">Save</button>
        </form>
    );
}

export default EditProfile;
