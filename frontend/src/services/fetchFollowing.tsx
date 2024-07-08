import { URL_FOLLOWING } from "../environment/URL";


const fetchFollowing = async (path: string, options: RequestInit) => {
    const response = await fetch(`${URL_FOLLOWING}/${path}`, options);
    const following = await response.json();
    return following;
}

export default fetchFollowing;