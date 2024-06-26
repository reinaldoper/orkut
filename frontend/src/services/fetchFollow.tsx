import { URL_FOLLOW } from "../environment/URL";


const fetchFollow = async (path: string, options: RequestInit) => {
    const response = await fetch(`${URL_FOLLOW}/${path}`, options);
    const followers = await response.json();
    return followers;
}

export default fetchFollow;