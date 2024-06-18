import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UserForm from "../pages/UserForm";
import ContentPage from "../pages/ContentPage";

const routerRoute = () => {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user-form" element={<UserForm />}></Route>
          <Route path="/content-page" element={<ContentPage />}></Route>
          <Route path="*" element={<h1>Page not found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default routerRoute
