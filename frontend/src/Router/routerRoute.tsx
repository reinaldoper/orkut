import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UserForm from "../pages/UserForm";

const routerRoute = () => {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user-form" element={<UserForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default routerRoute
