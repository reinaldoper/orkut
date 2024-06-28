import { Link } from "react-router-dom";
import logo from '../assets/logo_orkut.png';

const NavLink = () => {
  return (
    <div className="bg-blue-500 p-2 flex items-center text-lg text-white shadow-md">
      <img className="m-2 h-10" src={logo} alt="Orkut" title="Orkut" />
      <nav className="flex gap-4 ml-4">
        <Link to="/" className="hover:text-blue-200">Home</Link>
        <Link to="/content-page" className="hover:text-blue-200">Profile</Link>
        <Link to="/post-form" className="hover:text-blue-200">Create post</Link>
        <Link to="/post-list" className="hover:text-blue-200">Posts</Link>
      </nav>
    </div>
  );
}

export default NavLink;
