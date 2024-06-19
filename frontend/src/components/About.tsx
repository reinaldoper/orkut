import NavLink from "./NavLink"
import about from '../assets/about_orkut.webp'

const About = () => {
  return (
    <>
      <NavLink />
      <div className="bg-gradient-to-l hover:bg-gradient-to-r">
        <img src={about} alt="About_orkut" title="About_Orkut"/>
      </div>
    </>
  )
}

export default About
