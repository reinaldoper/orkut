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
  createdAt: Date;
  updatedAt: Date;
}