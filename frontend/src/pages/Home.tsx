import '../styles/App.css';
import orkut_png from '../assets/orkut1.webp';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import fetchUsers from '../services/fetchUsers'
import { ISubmit } from '../types/TUser';
import Alert from '../utils/alert';

function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  

  const navigate = useNavigate();

  const onSubmit = async (e: ISubmit) => {
    e.preventDefault();
    const body = {
      email: email ? email : '',
      password: password ? password : ''
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    const { token, error } = await fetchUsers('login', options);
    if (error) {
      setError(error);
    } else {
      localStorage.setItem('token', JSON.stringify(token));
      navigate('/content-page');
    }
  };



  return (
    <div className="flex flex-col ">
      <div className='content-header-page flex m-3 bg-blue-400'>
        <Header />
        <h1 className='orkut-logo'>Orkut</h1>
      </div>
      {error && <Alert errorAlert={{
        error,
        setError
      }} />}
      <div className="content-page">
        <div className="image-container">
          <img className="orkut-img" src={orkut_png} alt="orkut" title="orkut-page" />
        </div>
        <div className="login-container">
          <form onSubmit={onSubmit} className="login text-slate-600 shadow-2xl">
            <h3>Login</h3>
            <label>
              E-mail:
              <input required type="email" onChange={(e) => setEmail(e.target.value)} className="text-slate-500 email border-none" />
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
