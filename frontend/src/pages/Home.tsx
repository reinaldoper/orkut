import '../styles/App.css'
import orkut_png from '../assets/orkut1.webp'

function Home() {

  return (
    <div className='container'>
      <h1>Here goes the navigation page</h1>
      <div className='content-page'>
        <div>
          <img className='orkut-img' src={orkut_png} alt="orkut" title='orkut-page' />
        </div>
        <div className="read-the-docs">
          <form method="submit" className='login'>
            <h3>login</h3>
            <h4>Acesse o orkut com sua conta do Google</h4>
            <label htmlFor="">
              E-mail:
              <input type="email" className='email' />
            </label>
            <label htmlFor="">
              Senha:
              <input type="password" className='password' />
            </label>
            <label htmlFor="">
              <input type="checkbox" className='checkbox'/>
              Salvar as minhas informações neste computador
            </label>
            <button type="submit" className='button-login'>Login</button>
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default Home
