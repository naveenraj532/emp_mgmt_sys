import React, { useEffect, useState } from "react";
import "./DisplayEmp.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import EditProfile from "./EditProfile";
import Modal from "./Modal"; 

function DisplayEmp() {
    const [employees, setEmployees] = useState([]);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        axios.get("http://localhost:8080/api/employee/list")
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/employee/${id}`)
            .then(() => {
                fetchEmployees(); 
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            });
    };

    const handleEdit = (id) => {
        setEditingEmployeeId(id);
        setShowModal(true); 
    };

    const handleCloseEdit = () => {
        setEditingEmployeeId(null);
        setShowModal(false);         
        fetchEmployees(); 
    };

    return (
        <center>
            <div>
                <h2>Employees List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                <td>{employee.role}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        onClick={() => handleEdit(employee.id)}
                                        style={{ cursor: "pointer", marginRight: "10px" }}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        onClick={() => handleDelete(employee.id)}
                                        style={{ cursor: "pointer", color: "red" }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={showModal} handleClose={handleCloseEdit}>
                    {editingEmployeeId && (
                        <EditProfile
                            employeeId={editingEmployeeId}
                            onClose={handleCloseEdit}
                        />
                    )}
                </Modal>
            </div>
        </center>
    );
}

export default DisplayEmp;
