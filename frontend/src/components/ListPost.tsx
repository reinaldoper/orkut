import { useEffect, useState } from "react";
import fetchPosts from "../services/fetchPosts";
import { IPost } from "../types/TUser";
import Alert from "../utils/alert";
import MessagePost from "../utils/MessagePost";
import '../styles/ListPost.css'

const ListPost = () => {
  const [posts, setPosts] = useState<IPost[]>();
  const [error, setError] = useState('');

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
  }, []);

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
            <button onClick={() => handleLikes(post.id)} className="flex items-center gap-2 text-gray-700 hover:text-red-700" type="button">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
              </svg>
              <span>{post.likes}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPost;
