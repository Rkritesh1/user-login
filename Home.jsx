import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Retrieve user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome {user ? user.name : "Guest"}!</h1>

      {user ? (
        <button
          className="btn btn-danger mt-3"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload(); // Reload to update state
          }}
        >
          Logout
        </button>
      ) : (
        <p>Please login to access more features.</p>
      )}
    </div>
  );
};

export default Home;
