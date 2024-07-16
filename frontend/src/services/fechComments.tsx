import { URL_COMMENTS } from "../environment/URL";


const fetchComments = async (path: string, options: RequestInit) => {
  const res = await fetch(`${URL_COMMENTS}/${path}`, options);
  const comments = await res.json();
  return comments;
}

export default fetchComments;