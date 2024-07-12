import { useState, useEffect, useCallback } from "react";
import fetchCategory from "../services/fetchCategory";
import { ICategory } from "../types/TCategory";
import { IPostByCategory } from "../types/IPostByCategory";
import ReqUserById from "../utils/ReqUserById";

const ReqCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [postsByCategory, setPostsByCategory] = useState<IPostByCategory[]>([]);

  const getToken = () => localStorage.getItem('token') ?? '';

  const reqCategoriesById = useCallback(async (categoryId: number) => {
    const token = getToken();
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token)
      }
    };

    const { message } = await fetchCategory(`${categoryId}`, options);
    setPostsByCategory(message);
  }, []);

  const reqCategories = useCallback(async () => {
    const token = getToken();
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token)
      }
    };

    const { message } = await fetchCategory('', options);
    setCategories(message);
  }, []);

  useEffect(() => {
    reqCategories();
  }, [reqCategories]);

  useEffect(() => {
    if (selectedCategoryId > 0) {
      reqCategoriesById(selectedCategoryId);
    }
  }, [selectedCategoryId, reqCategoriesById]);


  const renderPosts = () => {
    const selectedCategory = postsByCategory.find(category => category.id === selectedCategoryId);
    if (selectedCategory && selectedCategory.posts.length) {
      return selectedCategory.posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4 mb-4 shadow-lg bg-white">
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-2">{post.content}</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Likes: {post.likes ?? 0}</span>
            <div className="flex items-center mb-4">
              <ReqUserById id={post.userId} />
              <h1 className="text-xl text-blue-600 font-semibold ml-4">{post.title}</h1>
            </div>
          </div>
        </div>
      ));
    } else {
      return <p className="text-center text-gray-600 mt-4">No posts available for this category.</p>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <select
        className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
      >
        <option value={0}>Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="mt-4">
        {renderPosts()}
      </div>
    </div>
  );
}

export default ReqCategories;
