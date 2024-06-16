'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        image: 'https://example.com/john.jpg',
        relationship: 'single',
        interesting: 'female',
        city: 'New York',
        work: 'Software Engineer',
        education: 'Bachelor of Science',
        age: '25-35',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        image: 'https://example.com/jane.jpg',
        relationship: 'single',
        interesting: 'female',
        city: 'New York',
        work: 'Software Engineer',
        education: 'Bachelor of Science',
        age: '25-35',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123',
        image: 'https://example.com/alice.jpg',
        relationship: 'single',
        interesting: 'female',
        city: 'New York',
        work: 'Software Engineer',
        education: 'Bachelor of Science',
        age: '25-35',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
