import { ISubmit } from "../types/TUser"
import { ChangeEvent, useState } from "react"
import fetchUsers from '../services/fetchUsers'
import { useNavigate } from "react-router-dom"
import NavLink from "./NavLink"
import educationList from "../utils/education"
import Alert from "../utils/alert"

const CreateUser = () => {
  const [file, setFile] = useState<File | null>(null)
  const [age, setAge] = useState<string>('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [relationship, setRelationship] = useState('');
  const [country, setCountry] = useState('');
  const [interesting, setInterest] = useState('');
  const [city, setCity] = useState('');
  const [work, setWork] = useState('');
  const [education, setEducation] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bio, setBio] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState('');
  const [favoriteBooks, setFavoriteBooks] = useState('');
  const [favoriteMusic, setFavoriteMusic] = useState('');
  const [language, setLanguage] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileType = event.target.files[0].name.slice(-3);
      if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'peg') {
        setError('Apenas arquivos de imagem são permitidos.');
        event.target.value = '';
        return;
      }
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const onSubmit = async (e: ISubmit) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', file ? file : '');
    formData.append('age', age ? age : '');
    formData.append('relationship', relationship ? relationship : '');
    formData.append('country', country ? country : '');
    formData.append('interesting', interesting ? interesting : '');
    formData.append('city', city ? city : '');
    formData.append('work', work ? work : '');
    formData.append('education', education ? education : '');
    formData.append('genro', gender ? gender : '');
    formData.append('phone_number', phoneNumber ? phoneNumber : '');
    formData.append('birthdate', birthdate ? birthdate : '');
    formData.append('bio', bio ? bio : '');
    formData.append('hobbies', hobbies ? hobbies : '');
    formData.append('favorite_movies', favoriteMovies ? favoriteMovies : '');
    formData.append('favorite_books', favoriteBooks ? favoriteBooks : '');
    formData.append('favorite_music', favoriteMusic ? favoriteMusic : '');
    formData.append('language', language ? language : '');
    formData.append('favorite_food', favoriteFood ? favoriteFood : '');

    const options = {
      method: 'POST',
      body: formData,
    };
    const { message, error } = await fetchUsers('', options)
    if (message) navigate('/');
    if (error) {
      setError(error)
      return;
    }
  }


  return (
    <>
      <NavLink />
      {error && <Alert errorAlert={{
        error,
        setError
      }} />}
      <form encType="multipart/form-data" onSubmit={onSubmit} className="space-y-4 p-4" style={{ margin: '0 10px' }}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            value={name}
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            value={email}
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            value={password}
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="age">Idade:</label>
          <input
            type="text"
            id="age"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="image">Foto de Perfil:</label>
          <input
            type="file"
            id="image"
            required
            onChange={handleFileChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="phone_number">Número de Telefone:</label>
          <input
            type="text"
            value={phoneNumber}
            id="phone_number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Digite seu número de telefone"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="birthdate">Data de Nascimento:</label>
          <input
            type="date"
            value={birthdate}
            id="birthdate"
            required
            onChange={(e) => setBirthdate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="bio">Biografia:</label>
          <textarea
            value={bio}
            id="bio"
            required
            onChange={(e) => setBio(e.target.value)}
            placeholder="Fale um pouco sobre você"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="hobbies">Hobbies:</label>
          <input
            type="text"
            value={hobbies}
            id="hobbies"
            required
            onChange={(e) => setHobbies(e.target.value)}
            placeholder="Digite seus hobbies"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="favorite_movies">Filmes Favoritos:</label>
          <input
            type="text"
            value={favoriteMovies}
            id="favorite_movies"
            required
            onChange={(e) => setFavoriteMovies(e.target.value)}
            placeholder="Digite seus filmes favoritos"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="favorite_books">Livros Favoritos:</label>
          <input
            type="text"
            value={favoriteBooks}
            id="favorite_books"
            required
            onChange={(e) => setFavoriteBooks(e.target.value)}
            placeholder="Digite seus livros favoritos"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="favorite_music">Músicas Favoritas:</label>
          <input
            type="text"
            value={favoriteMusic}
            id="favorite_music"
            required
            onChange={(e) => setFavoriteMusic(e.target.value)}
            placeholder="Digite suas músicas favoritas"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="language">Idioma:</label>
          <input
            type="text"
            value={language}
            id="language"
            required
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Digite seu idioma"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="favorite_food">Comida Favorita:</label>
          <input
            type="text"
            value={favoriteFood}
            id="favorite_food"
            required
            onChange={(e) => setFavoriteFood(e.target.value)}
            placeholder="Digite sua comida favorita"
            className="border rounded p-2 w-full"
          />
        </div>
        <fieldset>
          <legend>Estado Civil:</legend>
          <div>
            <label htmlFor="single">Solteiro(a):</label>
            <input
              type="radio"
              value="single"
              id="single"
              name="relationship"
              required
              onChange={(e) => setRelationship(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="married">Casado(a):</label>
            <input
              type="radio"
              value="married"
              id="married"
              name="relationship"
              required
              onChange={(e) => setRelationship(e.target.value)}
              className="mr-2"
            />
          </div>
        </fieldset>
        <div>
          <label htmlFor="country">País:</label>
          <input
            type="text"
            value={country}
            required
            id="country"
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Digite seu país"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="interesting">Interesses:</label>
          <input
            type="text"
            value={interesting}
            id="interesting"
            required
            onChange={(e) => setInterest(e.target.value)}
            placeholder="Digite seus interesses"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="city">Cidade:</label>
          <input
            type="text"
            value={city}
            required
            id="city"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Digite sua cidade"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="work">Trabalho:</label>
          <input
            type="text"
            value={work}
            id="work"
            required
            onChange={(e) => setWork(e.target.value)}
            placeholder="Digite sua ocupação"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="education">Educação:</label>
          <select required onChange={(e) => setEducation(e.target.value)}>
            <option value="default">Escolha seu nível:</option>
            {educationList.map((e, index) => (
              <option key={index} value={e.school}>{e.school}</option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend>Gênero:</legend>
          <div>
            <label htmlFor="male">Masculino:</label>
            <input
              type="radio"
              value="male"
              id="male"
              name="gender"
              required
              onChange={(e) => setGender(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="female">Feminino:</label>
            <input
              type="radio"
              value="female"
              id="female"
              name="gender"
              required
              onChange={(e) => setGender(e.target.value)}
              className="mr-2"
            />
          </div>
        </fieldset>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Cadastrar</button>
      </form>
    </>
  )
}

export default CreateUser
