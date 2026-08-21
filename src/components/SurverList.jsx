import { useSelector, useDispatch } from "react-redux";
import { removeSurvey } from "../redux/slices/SurveySlice";

function SurveyList() {
  const surveys = useSelector((state) => state.survey.surveys);
  const dispatch = useDispatch();

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl  border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Daftar Hasil Survei
      </h2>

      {surveys.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada data survei tersimpan.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b text-gray-700 text-sm">
                <th className="py-3 px-4">Nama</th>
                <th className="py-3 px-4">Umur</th>
                <th className="py-3 px-4">Hobi Nonton</th>
                <th className="py-3 px-4">Genre Favorit</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {surveys.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{item.name}</td>
                  <td className="py-3 px-4 text-gray-600">{item.age} tahun</td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.hobby === "yes" ? "Ya" : "Tidak"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.genres && item.genres.length > 0
                      ? item.genres.join(", ")
                      : "-"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => dispatch(removeSurvey(item.id))}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition duration-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SurveyList;
