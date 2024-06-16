import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const Protect = () => {
    const [authenticated, setAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get("http://localhost:8080/api/employee/check-auth")
            .then(response => {
                setAuthenticated(response.status === 200);
                setLoading(false);
            })
            .catch(error => {
                setAuthenticated(false);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Protect;
