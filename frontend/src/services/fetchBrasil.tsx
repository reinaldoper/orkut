import { URL_BRASIL } from "../environment/URL";

const fetchBrasil = async (options: RequestInit) => {
  const response = await fetch(URL_BRASIL, options);
  const data = await response.json();
  return data;
};


export default fetchBrasil;