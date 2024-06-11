'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('photos', [{
        title: 'Photo 1',
        url: 'https://example.com/photo1.jpg',
        post_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Photo 2',
        url: 'https://example.com/photo2.jpg',
        post_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Photo 3',
        url: 'https://example.com/photo3.jpg',
        post_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }], {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('photos', null, {});
    
  }
};
