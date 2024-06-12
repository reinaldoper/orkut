import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

const routerRoute = () => {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default routerRoute
