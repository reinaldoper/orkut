'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('followings', [{
        user_id: 1, 
        following_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2, 
        following_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 3, 
        following_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('followings', null, {});
    
  }
};
