import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UserForm from "../pages/UserForm";
import ContentPage from "../pages/ContentPage";
import NotFoundPage from "../pages/NotFoundPage";
import About from "../components/About";
import PostUser from "../pages/PostUser";
import PostFormUser from "../pages/PostFormUser";
import PostList from "../pages/PostList";

const routerRoute = () => {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user-form" element={<UserForm />}></Route>
          <Route path="/content-page" element={<ContentPage />}></Route>
          <Route path="*" element={<NotFoundPage  />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/post-user" element={<PostUser />}></Route>
          <Route path="/post-form" element={<PostFormUser />}></Route>
          <Route path="/post-list" element={<PostList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default routerRoute
