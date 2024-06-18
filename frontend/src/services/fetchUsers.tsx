import { URL } from "../environment/URL";

const fetchUsers = async (path: string, options: RequestInit) => {
  const res = await fetch(`${URL}/${path}`, options);
  const users = await res.json();
  return users;
}

export default fetchUsers;