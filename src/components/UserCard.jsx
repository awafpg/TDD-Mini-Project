import { Link } from "react-router-dom";

const UserCard = ({ name, email, avatar, id }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
      <div className="flex items-center space-x-4">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </div>
      <div className="pt-4 ">
        <Link
          className="hover:bg-amber-400 hover:text-white border-1 border-amber-400 text-amber-400 px-2 py-1 rounded-full"
          to={`/user/${id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
