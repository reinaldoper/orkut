import { Link } from "react-router-dom"
import logo from '../assets/logo_orkut.png'


const NavLink = () => {
  return (
    <>
      <div className="bg-blue-500 p-2 flex flex-wrap text-4xl">
        <img className="m-2" src={logo} alt="Orkut" title="Orkut" />
        <span className="text-gray-700"><Link to="/">home</Link></span>
        <span className="mx-2"></span>
        <span className="text-gray-700"><Link to="/content-page">user</Link></span>
        <span className="mx-2"></span>
        <span className="text-gray-700"><Link to="/post-form">post</Link></span>
        <span className="mx-2"></span>
        <span className="text-gray-700"><Link to="/post-list">posts</Link></span>
      </div>
    </>
  )
}

export default NavLink
