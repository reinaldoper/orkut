export interface ISubmit {
  preventDefault: () => void;
}


export interface User {
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
  favorite_books: string;
  favorite_food: string;
  favorite_movies: string;
  favorite_music: string;
  hobbies: string;
  birthdate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IError {
  errorAlert: {
    error: string;
    setError: (e: string)  => void;
  }
  
}