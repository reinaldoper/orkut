export default interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  image: string;  
  createdAt: Date;
  updatedAt: Date;
}