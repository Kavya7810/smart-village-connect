import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Admin.css";

const Admin = () => {
  const [newsData, setNewsData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    setAdminEmail(email || "");

    if (!email || role !== "Admin") {
      navigate("/login");
    } else {
      fetchNews();
    }
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("http://localhost:8080/news");
      const data = await res.json();
      setNewsData(data);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image })
      });
      if (res.ok) {
        alert("📰 News posted successfully!");
        setTitle("");
        setDescription("");
        setImage("");
        fetchNews();
      } else {
        alert("❌ Failed to post news");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderMedia = (mediaUrl) => {
    if (!mediaUrl) return null;

    if (mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be")) {
      let videoId = "";
      if (mediaUrl.includes("youtube.com")) {
        const urlParams = new URLSearchParams(new URL(mediaUrl).search);
        videoId = urlParams.get("v");
      } else if (mediaUrl.includes("youtu.be")) {
        videoId = mediaUrl.split("youtu.be/")[1];
      }
      return (
        <iframe
          width="300"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else if (mediaUrl.endsWith(".mp4")) {
      return (
        <video controls width="300">
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <img src={mediaUrl} alt="News media" width="300" />;
    }
  };

  return (
    <div className="admin-container">
      <h2>Welcome, {adminEmail}</h2>

      <form className="news-form" onSubmit={handleSubmit}>
        <h3>📝 Post New News</h3>
        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="News Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Image or Video URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Post News</button>
      </form>

      <div className="news-list">
        <h3>📢 All News</h3>
        {newsData.map((news) => (
          <div key={news._id} className="news-item">
            <h4>{news.title}</h4>
            <p>{news.description}</p>
            {renderMedia(news.image)}
            <p><small>{new Date(news.date).toLocaleString()}</small></p>
            <p>👍 {news.likes} | 👎 {news.dislikes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
