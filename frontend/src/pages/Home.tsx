import '../styles/App.css'
import orkut_png from '../assets/orkut1.webp'

function Home() {

  return (
    <>
      <div className='content-page'>
        <div>
          <img className='orkut-img' src={orkut_png} alt="orkut" />
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default Home
