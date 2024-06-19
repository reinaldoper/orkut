import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UserForm from "../pages/UserForm";
import ContentPage from "../pages/ContentPage";
import NotFoundPage from "../pages/NotFoundPage";
import About from "../components/About";

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default routerRoute
