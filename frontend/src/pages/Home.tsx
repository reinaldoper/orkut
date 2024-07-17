import '../styles/App.css';
import orkut_png from '../assets/orkut1.webp';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import fetchUsers from '../services/fetchUsers';
import { ISubmit } from '../types/TUser';
import Alert from '../utils/alert';
import Context from '../context/Context';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const context = useContext(Context);
  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  const { setValue } = context;

  const reqUserByEmail = async () => {
    const token = localStorage.getItem('token') ?? '';
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token),
      },
    };
    const options = {
      method: 'GET',
      headers: header.headers,
    };
    const { message, error } = await fetchUsers(`${email}`, options);
    if (error) {
      setError(error);
      return;
    }
    localStorage.setItem('user', JSON.stringify(message));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const setValueLogin = () => {
      setValue(false);
    };
    setValueLogin();
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (e: ISubmit) => {
    e.preventDefault();
    const body = {
      email: email ? email : '',
      password: password ? password : '',
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    const { token, error } = await fetchUsers('login', options);
    if (error) {
      setError(error);
    } else {
      setValue(true);
      reqUserByEmail();
      localStorage.setItem('token', JSON.stringify(token));
      navigate('/content-page');

      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('savedPassword', password);
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
      }
    }
  };

  return (
    <div className="flex flex-col">
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
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-slate-500 email border-none"
              />
            </label>
            <label>
              Senha:
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password"
              />
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
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
