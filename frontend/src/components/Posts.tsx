import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { User } from "../types/TUser";
import fetchUsers from "../services/fetchUsers";
import LoadingPage from "../pages/LoadingPage";
import '../styles/ProfilePost.css'
import fetchFollowing from "../services/fetchFollowing";
import { getToken } from "../utils/getToken";

const Posts = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);

  const { id } = useParams();

  const reqUser = useCallback(async () => {
    const token = getToken();
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(token),
      },
    };
    const options = {
      method: "GET",
      headers: header.headers,
    };
    const { message } = await fetchUsers(`find/${Number(id)}`, options);
    setUser(message);
    setLoading(false);
  }, [id]);


  const reqFollowing = useCallback(async () => {
    const token = getToken();
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(token),
      },
    };
    const options = {
      method: "GET",
      headers: header.headers,
    };
    const { message } = await fetchFollowing(`${Number(id)}`, options);
    setFollowing(message);
  }, [id]);

  useEffect(() => {
    reqUser();
    reqFollowing();
  }, [reqUser, reqFollowing]);

  console.log(following, id);
  

  const URL = user?.image ? `http://172.16.238.10:3000${user.image}` : "";

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col items-center bg-white p-6 rounded-md shadow-lg w-3/4 mx-auto mt-10">
          <div className="flex flex-col items-center">
            <img
              className="w-40 h-40 rounded-full border-4 border-blue-300 hover:scale-110 transition-transform duration-200"
              src={URL}
              alt="This is me"
              title="This is me"
            />
            <h1 className="text-4xl font-bold mt-4">{user?.name}</h1>
            <p className="text-xl text-gray-700">{user?.city}, {user?.country}</p>
          </div>

          <div className="mt-6 w-full">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">Sobre mim</h2>
            <p className="text-lg"><strong className="text-blue-500">Bio:</strong> {user?.bio}</p>
            <p className="text-lg mt-2"><strong className="text-blue-500">Email:</strong> {user?.email}</p>
            <p className="text-lg mt-2"><strong className="text-blue-500">Idade:</strong> {user?.age}</p>
            <p className="text-lg mt-2"><strong className="text-blue-500">Trabalho:</strong> {user?.work}</p>
            <p className="text-lg mt-2"><strong className="text-blue-500">Educação:</strong> {user?.education}</p>
            <p className="text-lg mt-2"><strong className="text-blue-500">Relacionamento:</strong> {user?.relationship}</p>
          </div>

          <div className="mt-6 w-full">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">Favoritos</h2>
            <p className="text-lg"><strong className="text-blue-500">Livros:</strong> {user?.favorite_books}</p>
            <p className="text-lg mt-2"><strong className="text-blue-500">Filmes:</strong> {user?.favorite_movies}</p>
            <p className="text-lg mt-2"><strong className="text-blue-500">Músicas:</strong> {user?.favorite_music}</p>
            <p className="text-lg mt-2"><strong className="text-blue-500">Comidas:</strong> {user?.favorite_food}</p>
            <p className="text-lg mt-2"><strong className="text-blue-500">Hobbies:</strong> {user?.hobbies}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
