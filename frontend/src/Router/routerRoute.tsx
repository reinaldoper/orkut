import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UserForm from "../pages/UserForm";
import ContentPage from "../pages/ContentPage";
import NotFoundPage from "../pages/NotFoundPage";
import About from "../components/About";
import PostUser from "../pages/PostUser";
import PostFormUser from "../pages/PostFormUser";
import PostList from "../pages/PostList";
import PostByCategory from "../pages/PostByCategory";
import Context from "../context/Context";
import { useState } from "react";

const RouterRoute = () => {
  const [value, setValue] = useState<boolean>(false);
  return (
    <Context.Provider value={{ value, setValue }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/content-page" element={<ContentPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/post-user/:id" element={<PostUser />} />
          <Route path="/post-form" element={<PostFormUser />} />
          <Route path="/post-list" element={<PostList />} />
          <Route path="/post-by-category" element={<PostByCategory />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default RouterRoute;
