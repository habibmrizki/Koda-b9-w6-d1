import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [inputName, setInputName] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;

    const userData = {
      username: inputName,
      photo_profile: `https://ui-avatars.com/api/?name=${inputName}`,
    };

    dispatch({
      type: "Login",
      payload: userData,
    });

    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/profile");
  };

  return (
    <div className="p-8 max-w-md mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Halaman Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Masukkan username..."
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="border p-2 rounded outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:opacity-80"
        >
          Masuk
        </button>
      </form>
    </div>
  );
};

export default Login;
