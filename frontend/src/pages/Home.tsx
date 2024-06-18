import '../styles/App.css';
import orkut_png from '../assets/orkut1.webp';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import fetchUsers from '../services/fetchUsers'
import { ISubmit } from '../types/TUser';

function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const onSubmit = async (e: ISubmit) => {
    e.preventDefault();
    const body = {
      email: email ?  email : '',
      password: password ? password : ''
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    const { token, error } = await fetchUsers('login',options);
    if (error) {
      alert(error);
    } else {
      localStorage.setItem('token', JSON.stringify(token));
      navigate('/content-page');
    }
  };


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
          <form onSubmit={onSubmit} className="login">
            <h3>Login</h3>
            {/* <h4>Acesse o Orkut com sua conta do Google</h4> */}
            <label>
              E-mail:
              <input required type="email" onChange={(e) => setEmail(e.target.value)} className="email" />
            </label>
            <label>
              Senha:
              <input required type="password" onChange={(e) => setPassword(e.target.value)} className="password" />
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
