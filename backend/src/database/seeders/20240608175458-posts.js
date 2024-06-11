'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('posts', [{
        title: 'First Post',
        content: 'This is the content of the first post',
        likes: 10,
        user_id: 3,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Second Post',
        content: 'This is the content of the second post',
        likes: 20,
        user_id: 1,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Third Post',
        content: 'This is the content of the third post',
        likes: 30,
        user_id: 2,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }], {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('posts', null, {});
    
  }
};
