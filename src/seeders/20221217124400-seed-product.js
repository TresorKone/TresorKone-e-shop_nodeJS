'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Yamaha-YAS 25',
      description: 'BlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlabla',
      imageUrl: '',
      price: '1067$',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
