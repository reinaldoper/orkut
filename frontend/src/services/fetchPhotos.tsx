import { URL_PHOTOS } from "../environment/URL";


const fetchPhotos = async (path: string, options: RequestInit) => {
  const res = await fetch(`${URL_PHOTOS}/${path}`, options);
  const photo = await res.json();
  return photo;
}

export default fetchPhotos;