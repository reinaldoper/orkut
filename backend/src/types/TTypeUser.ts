export default interface User {
  id?: number;
  name: string;
  genro: string;
  email: string;
  password: string;
  image: string;
  relationship: string;
  interesting: string;
  country: string;
  city: string;
  work: string;
  education: string;
  age: string;
  phone_number: string;
  birthdate: string;
  bio: string;
  hobbies: string;
  favorite_movies: string;
  favorite_books: string;
  favorite_music: string;
  language: string;
  favorite_food: string;
  createdAt: Date;
  updatedAt: Date;
}