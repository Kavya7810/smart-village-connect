import React, { useEffect, useState } from "react";
import "../styles/NewsFeed.css"; // create this for styling

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("http://localhost:8080/news");
      const data = await res.json();
      setNews(data);

      // Show push banner for latest item
      if (data.length > 0) {
        setAlertMessage(`📰 New: ${data[0].title}`);
        setTimeout(() => setAlertMessage(""), 5000);
      }
    } catch (err) {
      console.error("Error fetching news", err);
    }
  };

  const handleReaction = async (id, type) => {
    try {
      await fetch(`http://localhost:8080/news/${id}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction: type }),
      });
      fetchNews(); // update UI
    } catch (err) {
      console.error("Reaction failed", err);
    }
  };

  const filteredNews = news.filter((item) => {
    const matchesKeyword = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = selectedDate
      ? new Date(item.date).toISOString().slice(0, 10) === selectedDate
      : true;

    return matchesKeyword && matchesDate;
  });

  return (
    <div className="news">
    <div className="news-feed">
      {alertMessage && <div className="news-alert">{alertMessage}</div>}

      <div className="news-filters">
        <input
          type="text"
          placeholder="🔍 Search News..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {filteredNews.map((item) => (
        <div key={item._id} className="news-card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><i>{new Date(item.date).toLocaleDateString()}</i></p>

          {item.image && item.image.endsWith(".mp4") ? (
            <video width="100%" controls>
              <source src={item.image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : item.image ? (
            <img src={item.image} alt="media" className="news-image" />
          ) : null}
        </div>
      ))}

      {filteredNews.length === 0 && <p>No news found for your search/date filter.</p>}
    </div>
    </div>
  );
};

export default NewsFeed;