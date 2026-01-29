import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const fetchProfile = async () => {
    if (!username) return;

    try {
      setLoading(true);
      setError("");
      setUserData(null);

      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("Oops! User not found");
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="top-bar">
        <h1>GitHub Profile Finder</h1>
        <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchProfile}>Search</button>
      </div>

      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {userData && <ProfileCard user={userData} />}
    </div>
  );
}

export default App;
