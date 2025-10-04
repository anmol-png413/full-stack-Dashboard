import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const fetch = async () => {
    const { data } = await API.get("/auth/profile");
    setProfile({ name: data.name, email: data.email });
  };

  useEffect(()=>{ fetch(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await API.put("/auth/profile", { ...profile, password: password || undefined });
    setMsg("Profile updated");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow fade-in-up">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {msg && <div className="mb-2 text-green-600">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border rounded" value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})} />
        <input className="w-full p-2 border rounded" value={profile.email} onChange={e=>setProfile({...profile, email: e.target.value})} />
        <input type="password" className="w-full p-2 border rounded" placeholder="New password (optional)" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full p-2 bg-blue-600 text-white rounded btn-animated">Save</button>
      </form>
    </div>
  );
}
