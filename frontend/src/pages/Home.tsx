import '../styles/App.css';
import orkut_png from '../assets/orkut1.webp';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className='content-header-page'>
        <Header />
        <h1 className='orkut-logo'>Orkut</h1>
      </div>
      <div className="content-page">
        <div className="image-container">
          <img className="orkut-img" src={orkut_png} alt="orkut" title="orkut-page" />
        </div>
        <div className="login-container">
          <form method="submit" className="login">
            <h3>Login</h3>
            <h4>Acesse o Orkut com sua conta do Google</h4>
            <label>
              E-mail:
              <input type="email" className="email" />
            </label>
            <label>
              Senha:
              <input type="password" className="password" />
            </label>
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              Salvar as minhas informações neste computador
            </label>
            <label>
              <Link to='/user-form'>Ainda não tem cadastro?</Link>
            </label>
            <button type="submit" className="button-login">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
