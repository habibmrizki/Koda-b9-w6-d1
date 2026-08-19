import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "Logout" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isLoggedIn = Boolean(state.username);

  return (
    <header className="flex items-center justify-between px-4 lg:px-32 py-4 border-b border-b-gray-200">
      <h1 className="font-bold text-lg">
        {isLoggedIn ? `Hello, ${state.username}` : "EKODA"}
      </h1>
      <nav>
        <ul className="flex items-center gap-4">
          {!isLoggedIn ? (
            <li className="py-2 px-4 hover:bg-gray-100 rounded-lg">
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <>
              <li className="py-2 px-4 hover:bg-gray-100 rounded-lg">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="py-2 px-4 hover:opacity-80 rounded-lg bg-black text-white">
                <button onClick={handleLogout} className="cursor-pointer">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
