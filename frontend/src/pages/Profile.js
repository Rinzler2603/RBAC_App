import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: token },
        });
        setUser(res.data.user);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleGoToResources = () => {
    navigate('/resources'); // Navigate to the "My Resources" page
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#000", // Black background
        color: "#fff", // White font color
        fontFamily: "'Poppins', sans-serif", // Google Font
      }}
    >
      <h1 className="mb-4">Welcome to Your Profile</h1>
      <div className="text-center">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button
          onClick={handleLogout}
          className="btn btn-danger mt-3"
          style={{ padding: "10px 20px", fontWeight: "bold" }}
        >
          Logout
        </button>
        <br />
        <button
          onClick={handleGoToResources}
          className="btn btn-primary mt-3"
          style={{ padding: "10px 20px", fontWeight: "bold" }}
        >
          Go to My Resources
        </button>
      </div>
    </div>
  );
};

export default Profile;
