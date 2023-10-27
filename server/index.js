require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { faker } = require('@faker-js/faker');
const { Sneaker, Basket, Favorite, Order, OrderId } = require('./db/models');

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

app.get('/orders', async (req, res) => {
  try {
    const ordersAll = await Order.findAll();
    res.json(ordersAll);
  } catch (error) {
    console.warn('Error fetching the order', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/sneakers', async (req, res) => {
  const { id, title, price, imageUrl } = req.body;
  try {
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
  const { id, title, price, imageUrl } = req.body;
  try {
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

app.post('/orders', async (req, res) => {
  const orders = req.body;
  // Генерация случайного имени заказчика
  const randomName = faker.person.fullName();
  // Генерация случайного номера телефона заказчика
  const randomPhone = faker.phone.number();

  try {
    const orderItem = await OrderId.create({
      name: randomName,
      tel: randomPhone,
    });
    const orderIdFromBack = orderItem.id;
    const createdOrders = await Promise.all(
      orders.map((order) =>
        Order.create({
          title: order.title,
          price: order.price,
          imageUrl: order.imageUrl,
          sneakerId: order.sneakerId,
          orderId: orderIdFromBack,
        })
      )
    );

    res.status(200).json({ idOrder: orderIdFromBack, order: createdOrders });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении товара в orders' });
  }
});

app.delete('/basket', async (req, res) => {
  try {
    await Basket.destroy({ where: {} });
    res.status(200).json({ message: 'Basket is cleared' });
  } catch (error) {
    console.warn('Error clearing the basket', error);
    res.status(500).json({ error: 'An error occurred' });
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
