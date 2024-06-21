export interface ISubmit {
  preventDefault: () => void;
}


export interface User {
  id?: number;
  bio: string;
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
  posts: IPost[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IError {
  errorAlert: {
    error: string;
    setError: (e: string) => void;
  }

}

export interface IPost {
  id: number;
  title: string;
  content: string;
  likes: number;
  userId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  photos: Photos[]
}

export interface Photos {
  id: number;
  title: string;
  url: string;
  postId: number;
  createdAt: string;
  updatedAt: string
}