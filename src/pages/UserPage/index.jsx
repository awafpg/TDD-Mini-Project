import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const API_URL = "https://reqres.in/api/users";
  const API_KEY = "reqres-free-v1";

  const getUsers = async (pageNum) => {
    try {
      const response = await axios.get(`${API_URL}?page=${pageNum}`, {
        headers: {
          "x-api-key": API_KEY,
          Accept: "application/json",
        },
      });
      console.log("🚀 ~ getUsers ~ response:", response);
      setTotalPages(response.data.total_pages);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#feb924] text-white flex flex-col items-center py-10">
      <div className="flex justify-between items-center w-full px-4 mb-6">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-[#feb924] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <div className="w-full max-w-6xl bg-[#d38c48] shadow-md rounded-lg p-6 mx-auto sm:justify-start md:justify-center">
        <div className="flex flex-wrap gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="py-4 flex justify-center items-center w-full sm:w-auto md:w-auto"
            >
              <div>
                <UserCard
                  name={`${user.first_name} ${user.last_name}`}
                  avatar={user.avatar}
                  email={user.email}
                  id={user.id}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex space-x-4 py-4">
        <button
          disabled={page === 1}
          onClick={() => {
            handlePrev();
          }}
          className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-500 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => handleNext()}
          className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserPage;
