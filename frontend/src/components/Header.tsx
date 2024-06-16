import '../styles/header.css'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className='content-header text-blue-700 font-sans'>
      <Link to='/'>Home</Link> <div className='m-2'>|</div>
      <Link to='/user-form'>Join Orkut</Link> <div className='m-2'>|</div>
      <Link to='#'>Help</Link>
    </div>
  )
}

export default Header
