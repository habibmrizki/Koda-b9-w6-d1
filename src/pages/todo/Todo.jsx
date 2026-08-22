import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodoThunk,
  toggleTodoThunk,
  deleteTodoThunk,
} from "../../redux/slices/todoSlice";

function TodoList() {
  const [title, setTitle] = useState("");
  const { todos, isPending } = useSelector((state) => state.todoState);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTodoThunk(title));
    setTitle("");
  };

  return (
    <div className="min-h-screen bg-[#053146] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-[#022232] rounded-lg p-8 shadow-2xl border border-[#083b54]">
        <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">
          To-Do List
        </h2>

        {/* Input Form */}
        <form onSubmit={handleAdd} className="flex gap-3 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Please Enter a New task"
            className="flex-1 px-3 py-2 bg-transparent border border-[#114b67] text-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-[#eab308]"
          />
          <button
            type="submit"
            disabled={isPending || !title.trim()}
            className="bg-[#ffb703] hover:bg-[#ffa200] text-black font-bold px-5 py-2 text-xs uppercase tracking-wider transition rounded-sm disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "..." : "ADD"}
          </button>
        </form>

        {/* Todo Items */}
        <div className="divide-y divide-[#0c425e]">
          {!todos || todos.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-4">
              No tasks added yet.
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between py-3 gap-3"
              >
                <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={todo.completed || false}
                    onChange={() => dispatch(toggleTodoThunk(todo.id))}
                    className="w-4 h-4 accent-[#ffb703] cursor-pointer rounded-none"
                  />
                  <span
                    className={`text-sm select-none truncate ${
                      todo.completed
                        ? "line-through text-slate-500"
                        : "text-slate-200"
                    }`}
                  >
                    {todo.title}
                  </span>
                </label>

                <button
                  onClick={() => dispatch(deleteTodoThunk(todo.id))}
                  className="bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-medium px-3 py-1.5 rounded-sm transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
