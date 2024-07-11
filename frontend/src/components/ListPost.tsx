import { useEffect, useState, useCallback } from "react";
import fetchPosts from "../services/fetchPosts";
import fetchFollow from "../services/fetchFollow";
import { IPost } from "../types/TUser";
import { TFollowers } from "../types/IFollowers";
import Alert from "../utils/alert";
import MessagePost from "../utils/MessagePost";
import '../styles/ListPost.css'
import { User } from "../types/TUser";
import Modal from "../utils/Modal";
import ReqUserById from "../utils/ReqUserById";
import fetchFollowing from "../services/fetchFollowing";
import io from "socket.io-client";

const ListPost = () => {
  const [posts, setPosts] = useState<IPost[]>();
  const [error, setError] = useState('');
  const [followers, setFollowers] = useState<TFollowers[]>();
  const [open, setOpen] = useState(false);


  const getToken = () => localStorage.getItem('token') ?? '';
  const getUser = () => localStorage.getItem('user') ?? '';


  const reqFollowers = useCallback(async () => {
    const token = getToken();
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
  }, []);

  const reqPosts = useCallback(async () => {
    const token = getToken();
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
  }, []);

  const reqFollowing = useCallback(async (id: number) => {
    const token = getToken();
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token)
      }
    };
    const options = {
      method: 'POST',
      headers: header.headers,
      body: JSON.stringify({ userToFollowId: id })
    };
    const { error } = await fetchFollowing('', options);
    if (error) {
      setError(error);
      return;
    }

  }, []);




  const handleLikes = useCallback(async (id: number) => {
    const token = getToken();
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
  }, [reqPosts]);

  const reqUser = (): User => {
    const user = getUser();
    return JSON.parse(user) as unknown as User;
  }

  useEffect(() => {
    reqPosts();
    reqFollowers();

    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO');
    });

    socket.on('post', () => {
      setError('New post')
      reqPosts();
    });

    socket.on('likes', () => {
      setError('New like')
      reqPosts();
    });

    socket.on('photo', () => {
      setError('New photos')
      reqPosts();
    });

    socket.on('user', (user) => {
      setError(`New user ${user.name}`)
      reqPosts();
    });

    return () => {
      socket.disconnect();
    };
  }, [reqPosts, reqFollowers, open]);

  const SRC = 'http://172.16.238.10:3000'

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      {error.length > 0 && <Alert errorAlert={{ error, setError }} />}
      <div className="mb-4">
        {MessagePost()}
      </div>
      <div className="posts-list overflow-y-auto max-h-screen scrollbar-hide">
        {posts?.map((post) => (
          <div key={post.id} className="post-item bg-blue-50 p-4 mb-4 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <ReqUserById id={post.userId} />
              <h1 className="text-xl text-blue-600 font-semibold ml-4">{post.title}</h1>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex flex-wrap">
              {post.photos.length > 0 && post.photos.map((photo) => (
                <div key={photo.id} className="p-2">
                  <img className="w-32 h-32 rounded-lg hover:scale-105 transition-transform duration-200" src={`${SRC}${photo.url ?? ''}`} alt={photo.title} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <button onClick={() => handleLikes(post.id)} className="flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors duration-200" type="button">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clipRule="evenodd" />
                </svg>
                <span>({post.likes})</span>
              </button>
              <button onClick={() => reqFollowing(post.id)} className="flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors duration-200" type="button">
                <svg className="w-6 h-6 text-gray-800 hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                </svg>
                <span>Follow</span>
              </button>
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clipRule="evenodd" />
                </svg>
                <span>
                  ({followers?.reduce((count, follower) => {
                    return follower.userId === post.userId ? count + 1 : count;
                  }, 0)})
                </span>
              </span>
              {Number(reqUser()?.id) === post.userId &&
                <Modal onclick={setOpen} id={post.id} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPost;
