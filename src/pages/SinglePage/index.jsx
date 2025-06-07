import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const SinglePage = () => {
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleUserDetail = async (id) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`, {
        headers: { "x-api-key": "reqres-free-v1" },
      });
      setSelectedUser(response.data.data);

      console.log("🚀 ~ handleUserDetail ~ response:", response);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    if (id) {
      handleUserDetail(id);
    }
  }, [id]);

  return (
    <div className="bg-amber-400 h-screen text-white">
      <div className="flex justify-between items-center w-full pt-4 px-4 mb-6">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-[#feb924] font-semibold px-4 py-2 rounded-2xl hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
      {selectedUser ? (
        <div className=" text-white">
          <button className="pl-4" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <div className="flex justify-center">
            <div>
              <h2 className="pb-7 text-3xl font-bold">User Details</h2>
              <div className="flex justify-between">
                <div>
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.first_name}
                  />
                  <p>
                    Name: {selectedUser.first_name} {selectedUser.last_name}
                  </p>
                  <p>Email: {selectedUser.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-400 h-screen flex justify-center">
          <p className="text-4xl">Loading Data......</p>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
