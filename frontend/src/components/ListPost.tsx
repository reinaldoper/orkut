import { useEffect, useState, useCallback, ChangeEvent, FormEvent } from "react";
import fetchPosts from "../services/fetchPosts";
import fetchFollow from "../services/fetchFollow";
import fetchPhotos from "../services/fetchPhotos";
import { IPost } from "../types/TUser";
import { TFollowers } from "../types/IFollowers";
import Alert from "../utils/alert";
import MessagePost from "../utils/MessagePost";
import '../styles/ListPost.css'
import { User } from "../types/TUser";


const ListPost = () => {
  const [posts, setPosts] = useState<IPost[]>();
  const [error, setError] = useState('');
  const [followers, setFollowers] = useState<TFollowers[]>();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState<File | null>(null);

  const getToken = () => localStorage.getItem('token') ?? '';
  const getUser = () => localStorage.getItem('user') ?? '';

  const handleFile = useCallback(async (event: FormEvent<HTMLFormElement>, id: number) => {
    event.preventDefault();
    if (title.length === 0 && url === null) {
      setError('Preencha os campos.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    if (url) {
      formData.append('url', url);
    }
    formData.append('postId', id.toString());

    const token = getToken();
    const header = {
      headers: {
        'Authorization': JSON.parse(token)
      }
    };
    const options = {
      method: 'POST',
      headers: header.headers,
      body: formData
    };
    const { error } = await fetchPhotos('', options);
    if (error) {
      setError(error);
    } else {
      setTitle('');
      setUrl(null);
      setError('');
    }
  }, [title, url]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileType = event.target.files[0].name.slice(-3);
      if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'peg') {
        setError('Apenas arquivos de imagem são permitidos.');
        event.target.value = '';
        return;
      }
      setUrl(event.target.files[0]);
    } else {
      setUrl(null);
    }
  };

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
    setError('');
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
    setError('');
    setPosts(message);
  }, []);

  useEffect(() => {
    reqPosts();
    reqFollowers();
    handleFile({} as FormEvent<HTMLFormElement>, 0)
  }, [reqPosts, reqFollowers, handleFile]);

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
    setError('');
    reqPosts();
  }, [reqPosts]);

  const reqUser = (): User => {
    const user = getUser();

    return JSON.parse(user) as unknown as User;
  }

  const SRC = 'http://172.16.238.10:3000'

  return (
    <div className="flex content flex-col mx-auto bg-gray-100 p-10 rounded-lg shadow-md w-10/12 mt-8">
      {error && <Alert errorAlert={{ error, setError }} />}
      <div className="hover:ps-10 hover:pe-10">
        {MessagePost()}
      </div>
      <div className="max-h-96 overflow-y-scroll scrollbar-hide">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white p-6 mt-4 rounded-lg shadow-md">
            <h2 className="text-blue-600 mb-2">{post.title}</h2>
            <p className="mb-4">{post.content}</p>
            <div className="flex flex-wrap">
              {post.photos.length > 0 && post.photos.map((photo) => (
                <div key={photo.id} className="bg-slate-400">
                  <img className="w-32 h-32 rounded-3xl p-2 hover:scale-150" src={`${SRC}${photo.url ?? ''}`} alt={photo.title} />
                </div>
              ))}
            </div>
            <div className="flex my-8">
              <button onClick={() => handleLikes(post.id)} className="flex items-center gap-2 text-gray-700 hover:text-red-700" type="button">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clipRule="evenodd" />
                </svg>
                <span>{post.likes}</span>
              </button>
              <span className="text-sm mx-10 flex text-gray-500 hover:text-red-700">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clipRule="evenodd" />
                </svg>
                ({followers?.reduce((count, follower) => {
                  return follower.userId === post.userId ? count + 1 : count;
                }, 0)})
              </span>
              {Number(reqUser()?.id) === post.userId && (
                <form className="flex flex-wrap border-b-dark" encType="multipart/form-data" onSubmit={(event) => handleFile(event, post.id)}>
                  <input placeholder="Titulo da foto" onChange={(e) => setTitle(e.target.value)} type="text" className="bg-slate-600 rounded-lg me-2" />
                  <input type="file" onChange={handleFileChange} className="bg-slate-600  rounded-lg me-2 placeholder-zinc-600 px-2 border" />
                  <button className="flex items-center gap-2 text-gray-700 hover:text-red-700" type="submit">
                    <svg className="w-6 h-6 text-gray-800 dark:text-black hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPost;
