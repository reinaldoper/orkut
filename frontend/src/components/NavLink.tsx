import { Link } from "react-router-dom"


const NavLink = () => {
  return (
    <>
      <h1 className="bg-blue-200 p-4 flex">
        <Link to="/">Home</Link>
      </h1>
    </>
  )
}

export default NavLink
