import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { state, dispatch } = useContext(AuthContext);

  const [editName, setEditName] = useState(state.username || "");
  const [editPhoto, setEditPhoto] = useState("");
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    if (!editName.trim()) return;

    const finalPhoto = editPhoto.trim()
      ? editPhoto.trim()
      : state.photo_profile;

    dispatch({
      type: "Edit",
      payload: {
        username: editName,
        photo_profile: finalPhoto,
      },
    });

    setEditPhoto("");
  };

  const handleLogout = () => {
    dispatch({ type: "Logout" });
    navigate("/login");
  };

  if (!state.username) {
    return (
      <div className="p-8 text-center">
        <p>Anda belum login.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-md mx-auto flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Profil Pengguna</h2>

      {state.photo_profile && (
        <img
          src={state.photo_profile}
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover mx-auto"
        />
      )}

      <p className="text-center">
        Username saat ini: <strong>{state.username}</strong>
      </p>

      <form onSubmit={handleEdit} className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-semibold">Username:</label>
          <input
            type="text"
            placeholder="Ganti username..."
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border p-2 rounded w-full mt-1"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold">URL Foto Profil:</label>
          <input
            type="text"
            placeholder="https://example.com/photo.jpg"
            value={editPhoto}
            onChange={(e) => setEditPhoto(e.target.value)}
            className="border p-2 rounded w-full mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-slate-50 font-medium py-2.5 px-4 rounded-lg hover:bg-slate-800 active:scale-[0.99] transition-all duration-200 cursor-pointer shadow-sm mt-2"
        >
          Ubah Profil
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="w-full bg-rose-50 text-rose-600 font-medium py-2.5 px-4 rounded-lg border border-rose-200 hover:bg-rose-100 hover:text-rose-700 active:scale-[0.99] transition-all duration-200 cursor-pointer mt-1"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
