// routes/news.js
const express = require('express');
const router = express.Router();
const News = require('./models/News');

// GET all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' });
  }
});

// ✅ POST new news (from Admin page)
router.post('/', async (req, res) => {
  const { title, description, image } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const newNews = new News({
    title,
    description,
    image,
    date: new Date()
  });

  try {
    await newNews.save();
    res.status(201).json({ message: 'News posted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving news' });
  }
});

// POST a reaction (like/dislike)
router.post('/:id/react', async (req, res) => {
  const { reaction } = req.body;
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });

    if (reaction === 'like') news.likes++;
    else if (reaction === 'dislike') news.dislikes++;

    await news.save();
    res.json({ message: 'Reaction updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating reaction' });
  }
});

module.exports = router;
