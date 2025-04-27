import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/AddNews.css";

const AddNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
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

      const localReactions = JSON.parse(localStorage.getItem("newsReactions") || "{}");

      const updatedNews = data.map((item) => {
        const reactions = localReactions[item._id] || { likes: 0, dislikes: 0 };
        return { ...item, likes: reactions.likes, dislikes: reactions.dislikes };
      });

      setNewsData(updatedNews);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    }
  };

  const saveReactionsToLocalStorage = (newsArray) => {
    const reactions = {};
    newsArray.forEach((item) => {
      reactions[item._id] = { likes: item.likes, dislikes: item.dislikes };
    });
    localStorage.setItem("newsReactions", JSON.stringify(reactions));
  };

  const handleLike = (id) => {
    const updatedNews = newsData.map((item) =>
      item._id === id ? { ...item, likes: item.likes + 1 } : item
    );
    setNewsData(updatedNews);
    saveReactionsToLocalStorage(updatedNews);
  };

  const handleDislike = (id) => {
    const updatedNews = newsData.map((item) =>
      item._id === id ? { ...item, dislikes: item.dislikes + 1 } : item
    );
    setNewsData(updatedNews);
    saveReactionsToLocalStorage(updatedNews);
  };

  const handleDelete = async () => {
    if (!newsToDelete) return;
    try {
      const res = await fetch(`http://localhost:8080/news/${newsToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNewsData(newsData.filter((item) => item._id !== newsToDelete));
        showPopup("🗑️ News deleted successfully!");
      } else {
        showPopup("❌ Failed to delete news");
      }
    } catch (err) {
      console.error(err);
      showPopup("❌ Error occurred while deleting");
    } finally {
      setShowDeleteModal(false);
      setNewsToDelete(null);
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
        setTitle("");
        setDescription("");
        setImage("");
        fetchNews();
        showPopup("📰 News posted successfully!");
      } else {
        showPopup("❌ Failed to post news");
      }
    } catch (err) {
      console.error(err);
      showPopup("❌ Error occurred while posting");
    }
  };

  const showPopup = (message) => {
    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.innerText = message;
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.classList.add("visible");
    }, 100);
    setTimeout(() => {
      popup.classList.remove("visible");
      setTimeout(() => document.body.removeChild(popup), 500);
    }, 3000);
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
    <div className="admin1">
      <div className="admin-container">
        <h2>Welcome, Admin</h2>

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
              <div className="reaction-buttons">
                <button className="delete-btn" onClick={() => {
                  setNewsToDelete(news._id);
                  setShowDeleteModal(true);
                }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>Are you sure you want to delete this news?</h3>
            <div className="delete-modal-buttons">
              <button className="confirm" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancel" onClick={() => {
                setShowDeleteModal(false);
                setNewsToDelete(null);
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNews;
