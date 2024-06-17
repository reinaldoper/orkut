import { URL } from "../environment/URL";

const fetchUsers = async (options: RequestInit) => {
  const res = await fetch(URL, options);
  const users = await res.json();
  return users;
}

export default fetchUsers;