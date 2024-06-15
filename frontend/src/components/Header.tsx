import '../styles/header.css'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className='content-header'>
      <Link to='#'>Home</Link> |
      <Link to='#'>Join Orkut</Link> |
      <Link to='#'>Help</Link>
    </div>
  )
}

export default Header
