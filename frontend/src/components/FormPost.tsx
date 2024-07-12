import { useEffect, useState, useCallback } from "react";
import fetchCategory from "../services/fetchCategory";
import { ICategory } from "../types/TCategory";
import Alert from "../utils/alert";
import { ISubmit } from "../types/TUser";
import fetchPosts from "../services/fetchPosts";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const FormPost = () => {
  const [error, setError] = useState('');
  const [category, setCategory] = useState<ICategory[]>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loadings, setLoading] = useState(false);

  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('token') ?? '';

  const reqCategories = useCallback(async () => {
    const token = getToken()
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
    const { message, error } = await fetchCategory('', options);
    if (error) {
      setError(error);
      return;
    }
    setLoading(true);
    setCategory(message);
  }, []);

  useEffect(() => {
    reqCategories();
  }, [reqCategories]);

  const onSubmit = async (e: ISubmit) => {
    e.preventDefault();
    if (selectedCategoryId.length === 0) {
      setError('Preencha todos os campos!');
      return;
    }
    const token = getToken();
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token)
      }
    };
    const body = JSON.stringify({
      title,
      content,
      categoryId: Number(selectedCategoryId)
    });
    const options = {
      method: 'POST',
      headers: header.headers,
      body
    };
    const { error } = await fetchPosts('', options);
    if (error) {
      setError(error);
      return;
    }
    navigate('/post-list');
  };

  return (
    <>
      {!loadings ? <div>
        <Alert errorAlert={{ error, setError }} />
        <LoadingPage />
      </div> : <div className="flex justify-center mt-8">
        <form onSubmit={onSubmit} className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">No que você está pensando?</h2>
          {error && <Alert errorAlert={{ error, setError }} />}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Título:</label>
            <input
              value={title}
              id="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite um título..."
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="content">Conteúdo:</label>
            <textarea
              value={content}
              id="content"
              required
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite o conteúdo..."
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={5}
              minLength={10}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="category">Categoria:</label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              name="category"
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Selecione uma categoria...</option>
              {category?.map((c, index) => (
                <option key={index} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>}
    </>
  );
};

export default FormPost;
