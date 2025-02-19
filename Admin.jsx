import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                setError("No authentication token found");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get("http://localhost:5000/api/auth/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (err) {
                setError(err.response?.data || "Error fetching users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    return (
        <div>
            {/* Responsive Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Admin Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Users</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <h2>Admin Dashboard</h2>
                {loading ? (
                    <p>Loading users...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <ul className="list-group">
                        {users.map((user) => (
                            <li key={user._id} className="list-group-item">
                                {user.name} - {user.email}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Admin;
