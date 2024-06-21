import { URL_CATEGORY } from "../environment/URL";


const fetchCategory = async (path: string, options: RequestInit) => {
  const res = await fetch(`${URL_CATEGORY}/${path}`, options);
  const category = await res.json();
  return category;
}

export default fetchCategory;