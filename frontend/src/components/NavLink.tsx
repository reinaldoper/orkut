import { Link } from "react-router-dom";
import logo from '../assets/logo_orkut.png';
import { useContext } from 'react';

import Context from "../context/Context";

const NavLink = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  const { value } = context;
  return (
    <div className="bg-blue-500 p-2 flex items-center text-lg text-white shadow-md">
      <img className="m-2 h-10" src={logo} alt="Orkut" title="Orkut" />
      <Link to="/" className="hover:text-blue-200">Home</Link>
      {value && <>
        <nav className="flex gap-4 ml-4">
          <Link to="/content-page" className="hover:text-blue-200">Profile</Link>
          <Link to="/post-form" className="hover:text-blue-200">Create post</Link>
          <Link to="/post-list" className="hover:text-blue-200">Posts</Link>
        </nav>
        <div className="flex mx-auto p-2 bg-blue-300 text-blue-500 rounded-lg">
          <Link to="/post-by-category"
            className="hover:text-blue-200 hover:mx-2.5"
          >
            Select post by category...
          </Link>
        </div></>}
    </div>
  );
}

export default NavLink;
