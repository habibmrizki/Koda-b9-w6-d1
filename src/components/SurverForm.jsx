import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSurvey } from "../redux/slices/SurveySlice";

function SurveyForm() {
  const dispatch = useDispatch();
  const options = ["Horror", "Romance", "Fantasy"];

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hobby, setHobby] = useState("yes");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleCheckboxChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age) return;

    const newSurvey = {
      name,
      age: Number(age),
      hobby,
      genres: selectedGenres,
    };

    dispatch(addSurvey(newSurvey));
    setName("");
    setAge("");
    setHobby("yes");
    setSelectedGenres([]);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl  border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Form Survei Penonton Film
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Masukkan nama"
            required
          />
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Umur
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Masukkan umur"
            required
          />
        </div>

        <div>
          <label
            htmlFor="hobby"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Apakah kamu hobi menonton film?
          </label>
          <select
            name="hobby"
            id="hobby"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="yes">Iya</option>
            <option value="no">Tidak</option>
          </select>
        </div>

        {hobby === "yes" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genre Film Favorit
            </label>
            <div className="space-y-2">
              {options.map((genre) => (
                <label
                  key={genre}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleCheckboxChange(genre)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 text-sm">{genre}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Submit Survei
        </button>
      </form>
    </div>
  );
}

export default SurveyForm;
