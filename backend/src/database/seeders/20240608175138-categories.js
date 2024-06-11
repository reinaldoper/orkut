'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('categories', [
      {
        name: 'Technology',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Health',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Science',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Education',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Business',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Entertainment',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sports',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Politics',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Travel',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Lifestyle',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Food',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Fashion',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Finance',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Real Estate',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Automotive',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Music',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gaming',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Books',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Movies',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Television',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Art',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Photography',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Fitness',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Parenting',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Relationships',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'History',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Culture',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Nature',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Environment',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Technology Trends',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Personal Development',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Spirituality',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
