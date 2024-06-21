import { URL_POSTS } from "../environment/URL";


const fetchPosts = async (path: string, options: RequestInit) => {
  const res = await fetch(`${URL_POSTS}/${path}`, options);
  const posts = await res.json();
  return posts;
}

export default fetchPosts;