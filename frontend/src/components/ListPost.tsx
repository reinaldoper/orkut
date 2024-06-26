import { useEffect, useState } from "react";
import fetchPosts from "../services/fetchPosts";
import { IPost } from "../types/TUser";
import Alert from "../utils/alert";
import MessagePost from "../utils/MessagePost";
import '../styles/ListPost.css'
import fetchFollow from "../services/fetchFollow";
import { TFollowers } from "../types/IFollowers";

const ListPost = () => {
  const [posts, setPosts] = useState<IPost[]>();
  const [error, setError] = useState('');
  const [followers, setFollowers] = useState<TFollowers[]>()

  const reqFollowers = async () => {
    const token = localStorage.getItem('token') ?? '';
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token)
      }
    };
    const options = {
      method: 'GET',
      headers: header.headers,
    };
    const { error, message } = await fetchFollow('', options);
    if (error) {
      setError(error);
      return;
    }
    setFollowers(message);
  };

  const reqPosts = async () => {
    const token = localStorage.getItem('token') ?? '';
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token)
      }
    };
    const options = {
      method: 'GET',
      headers: header.headers,
    };
    const { error, message } = await fetchPosts('', options);
    if (error) {
      setError(error);
      return;
    }
    setPosts(message);
  };

  useEffect(() => {
    reqPosts();
    reqFollowers();
  }, []);

  console.log(followers);

  const handleLikes = async (id: number) => {
    const token = localStorage.getItem('token') ?? '';
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token)
      }
    };
    const options = {
      method: 'PATCH',
      headers: header.headers,
      body: JSON.stringify({ likes: 1 })
    };
    const { error } = await fetchPosts(`/${id}`, options);
    if (error) {
      setError(error);
      return;
    }
    reqPosts();

  };

  return (
    <div className="flex flex-col mx-auto bg-gray-100 p-6 rounded-lg shadow-md w-9/12 mt-8">
      {error && <Alert errorAlert={{ error, setError }} />}
      {MessagePost()}
      <div className="max-h-96 overflow-y-scroll scrollbar-hide">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white p-6 mt-4 rounded-lg shadow-md">
            <h2 className="text-blue-600 mb-2">{post.title}</h2>
            <p className="mb-4">{post.content}</p>
            <div className="flex my-8">
              <button onClick={() => handleLikes(post.id)} className="flex items-center gap-2 text-gray-700 hover:text-red-700" type="button">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clip-rule="evenodd" />
                </svg>
                <span>{post.likes}</span>
              </button>
              <span className="text-sm mx-10 flex text-gray-500 hover:text-red-700">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd" />
                </svg>
                ({followers?.reduce((count, follower) => {
                  return follower.userId === post.userId ? count + 1 : count;
                }, 0)})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPost;
