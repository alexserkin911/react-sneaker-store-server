'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Sneakers',
      [
        {
          title: 'Мужские Кроссовки Nike Blazer Mid Suede',
          price: 12999,
          imageUrl: './img/sneakers/1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Nike Air Max 270',
          price: 17500,
          imageUrl: './img/sneakers/2.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Nike Blazer Mid Suede',
          price: 25900,
          imageUrl: './img/sneakers/3.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Кроссовки Puma X Aka Boku Future Rider',
          price: 65300,
          imageUrl: './img/sneakers/4.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Under Armour Curry 8',
          price: 71200,
          imageUrl: './img/sneakers/5.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Nike Kyrie 7',
          price: 15600,
          imageUrl: './img/sneakers/5.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Jordan Air Jordan 11',
          price: 98000,
          imageUrl: './img/sneakers/7.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Nike LeBron XVIII',
          price: 14000,
          imageUrl: './img/sneakers/8.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Nike Lebron XVIII Low',
          price: 11200,
          imageUrl: './img/sneakers/9.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Nike Blazer Mid Suede',
          price: 21500,
          imageUrl: './img/sneakers/10.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Кроссовки Nike Air 80',
          price: 23000,
          imageUrl: './img/sneakers/11.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Кроссовки Puma X Aka Boku Future Rider',
          price: 9800,
          imageUrl: './img/sneakers/12.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Nike Kyrie Flytrap V',
          price: 7600,
          imageUrl: './img/sneakers/13.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
          price: 28100,
          imageUrl: './img/sneakers/14.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Кроссовки Adidas Stan Smith',
          price: 10000,
          imageUrl: './img/sneakers/15.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Кроссовки Puma Aka Boku Future Rider',
          price: 7500,
          imageUrl: './img/sneakers/17.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
