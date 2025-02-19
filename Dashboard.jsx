import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name}!</p>
      <button className="btn btn-danger" onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
