import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [query, setQuery] = useState("");
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(()=>{ fetchTasks(); }, []);

  const fetchTasks = async (q="") => {
    const { data } = await API.get(`/tasks${q ? '?q='+encodeURIComponent(q): ''}`);
    setTasks(data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    await API.post("/tasks", { title, description: desc });
    setTitle(""); setDesc("");
    fetchTasks();
  };

  const remove = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div>
          <Link to="/profile" className="mr-3 hover:underline">Profile</Link>
          <button onClick={()=>{ logout(); nav("/login"); }} className="px-3 py-1 bg-red-500 text-white rounded btn-animated">Logout</button>
        </div>
      </div>

      <div className="mb-6">
        <form onSubmit={createTask} className="space-y-3 glass-card p-4 rounded shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
            <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full p-2 border rounded md:col-span-2" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded btn-animated md:col-span-3">Add Task</button>
          </div>
        </form>
      </div>

      <div className="mb-4">
        <input placeholder="Search title..." value={query} onChange={e=>setQuery(e.target.value)} className="p-2 border rounded mr-2" />
        <button onClick={()=>fetchTasks(query)} className="px-3 py-1 bg-gray-800 text-white rounded">Search</button>
        <button onClick={()=>{ setQuery(''); fetchTasks(); }} className="ml-2 px-3 py-1 border rounded">Clear</button>
      </div>

      <ul className="space-y-4">
        {tasks.length === 0 && (
          <li className="text-center text-gray-500 py-8">
            <div className="mx-auto max-w-xs">
              <svg className="mx-auto mb-3" width="96" height="96" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M7 11h10M5 15h14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div>No tasks yet — add your first task.</div>
            </div>
          </li>
        )}
        {tasks.map((t, i) => (
          <li key={t._id} className={`bg-white p-4 rounded shadow task-card fade-in-up`} style={{animationDelay: `${i*60}ms`}}>
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm text-gray-600">{t.description}</p>
              </div>
              <div className="space-x-2 flex items-start">
                <button onClick={()=>remove(t._id)} className="px-3 py-1 bg-red-500 text-white rounded btn-animated">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
