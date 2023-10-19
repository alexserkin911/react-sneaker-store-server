require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Sneaker, Basket, Favorite } = require('./db/models');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/sneakers', async (req, res) => {
  try {
    const sneakersAll = await Sneaker.findAll();
    res.json(sneakersAll);
  } catch (error) {
    console.warn('no sneakers', error);
  }
});

app.get('/basket', async (req, res) => {
  try {
    const basketAll = await Basket.findAll();
    res.json(basketAll);
  } catch (error) {
    console.warn('Error fetching the basket', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/favorites', async (req, res) => {
  try {
    const favoriteAll = await Favorite.findAll();
    res.json(favoriteAll);
  } catch (error) {
    console.warn('Error fetching the favorite', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/sneakers', async (req, res) => {
  try {
    const { id, title, price, imageUrl } = req.body;

    const basketItem = await Basket.create({
      title,
      price,
      imageUrl,
      sneakerId: id,
    });
    res.status(200).json(basketItem);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении товара в корзину' });
  }
});

app.post('/favorites', async (req, res) => {
  try {
    const { id, title, price, imageUrl } = req.body;

    const favoriteItem = await Favorite.create({
      title,
      price,
      imageUrl,
      sneakerId: id,
    });
    res.status(200).json(favoriteItem);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении товара в favorite' });
  }
});

app.delete('/basket/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Basket.destroy({
      where: { sneakerId: id },
    });
    res.status(200).json({ message: 'Товар успешно удален из корзины' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении товара из корзины' });
  }
});

app.delete('/favorites/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Favorite.destroy({
      where: { sneakerId: id },
    });
    res.status(200).json({ message: 'Товар успешно удален из Favorite' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении товара из Favorite' });
  }
});

app.listen(PORT, () => {
  console.log(`Server starting on PORT ${PORT}`);
});
