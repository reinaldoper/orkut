export default interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  image: string;  
  relationship: string;
  interesting: string;
  city: string;
  work: string;
  education: string;
  age: string;
  createdAt: Date;
  updatedAt: Date;
}