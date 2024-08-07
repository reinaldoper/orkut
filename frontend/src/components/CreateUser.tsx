import { ISubmit } from "../types/TUser";
import { ChangeEvent, useState, useEffect, useCallback } from "react";
import fetchUsers from '../services/fetchUsers';
import { useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import educationList from "../utils/education";
import Alert from "../utils/alert";
import genre from "../utils/genre";
import linguas_nativas from "../utils/linguasNativas";
import principais_paises from "../utils/paisesList";
import relacition_ship from "../utils/relacionamento";
import fetchBrasil from "../services/fetchBrasil";
import { IDistricts } from "../types/IDistricts";


const CreateUser = () => {
  const [file, setFile] = useState<File | null>(null);
  const [age, setAge] = useState<string>('');
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
  const [error, setError] = useState('');
  const [districts, setDistricts] = useState<IDistricts[]>();
  const [district, setDistrict] = useState('');
  const [kind, setKind] = useState('');

  
  console.log(gender);
  
  const navigate = useNavigate();

  const handleCountryBrasil = useCallback(async () => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const options = {
      method: 'GET',
      headers: header.headers,
    };
    const data = await fetchBrasil(options);
    setDistricts(data);

  }, []);

  useEffect(() => {
    handleCountryBrasil();
  }, [handleCountryBrasil]);



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

  const compareCity = districts?.some((d) => d["UF-nome"] === city)


  const onSubmit = async (e: ISubmit) => {
    e.preventDefault();
    let newKind = ''
    if(kind === 'Outro'){
      newKind = gender
    } else {
      newKind = kind
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', file ? file : '');
    formData.append('age', age ? age : '');
    formData.append('relationship', relationship ? relationship : '');
    formData.append('country', country ? country : '');
    formData.append('interesting', interesting ? interesting : '');
    formData.append('city', city ? `${city}, ${district}` : '');
    formData.append('work', work ? work : '');
    formData.append('education', education ? education : '');
    formData.append('genro', newKind ? newKind : '');
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
    const { message, error } = await fetchUsers('', options);
    if (message) {
      navigate('/')
    }
    if (error) {
      setError(error);
      return;
    }
  };

  return (
    <>
      <NavLink />
      {error && <Alert errorAlert={{ error, setError }} />}
      <form encType="multipart/form-data" onSubmit={onSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 orkut-form">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 orkut-title">Criar Novo Usuário</h2>
        <div className="orkut-input">
          <label htmlFor="name" className="block text-gray-700 font-bold">Nome:</label>
          <input
            type="text"
            value={name}
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="email" className="block text-gray-700 font-bold">E-mail:</label>
          <input
            type="email"
            value={email}
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="password" className="block text-gray-700 font-bold">Senha:</label>
          <input
            type="password"
            value={password}
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="age" className="block text-gray-700 font-bold">Idade:</label>
          <input
            type="text"
            id="age"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="image" className="block text-gray-700 font-bold">Foto de Perfil:</label>
          <input
            type="file"
            id="image"
            required
            onChange={handleFileChange}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="phone_number" className="block text-gray-700 font-bold">Número de Telefone:</label>
          <input
            type="text"
            value={phoneNumber}
            id="phone_number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Digite seu número de telefone"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="birthdate" className="block text-gray-700 font-bold">Data de Nascimento:</label>
          <input
            type="date"
            value={birthdate}
            id="birthdate"
            required
            onChange={(e) => setBirthdate(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="bio" className="block text-gray-700 font-bold">Biografia:</label>
          <textarea
            value={bio}
            id="bio"
            required
            onChange={(e) => setBio(e.target.value)}
            placeholder="Fale um pouco sobre você"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="hobbies" className="block text-gray-700 font-bold">Hobbies:</label>
          <input
            type="text"
            value={hobbies}
            id="hobbies"
            required
            onChange={(e) => setHobbies(e.target.value)}
            placeholder="Digite seus hobbies"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="favorite_movies" className="block text-gray-700 font-bold">Filmes Favoritos:</label>
          <input
            type="text"
            value={favoriteMovies}
            id="favorite_movies"
            required
            onChange={(e) => setFavoriteMovies(e.target.value)}
            placeholder="Digite seus filmes favoritos"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="favorite_books" className="block text-gray-700 font-bold">Livros Favoritos:</label>
          <input
            type="text"
            value={favoriteBooks}
            id="favorite_books"
            required
            onChange={(e) => setFavoriteBooks(e.target.value)}
            placeholder="Digite seus livros favoritos"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="favorite_music" className="block text-gray-700 font-bold">Músicas Favoritas:</label>
          <input
            type="text"
            value={favoriteMusic}
            id="favorite_music"
            required
            onChange={(e) => setFavoriteMusic(e.target.value)}
            placeholder="Digite suas músicas favoritas"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="language" className="block text-gray-700 font-bold">Idiomas:</label>
          <select
            value={language}
            id="language"
            required
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          >
            <option>Selecione sua lingua nativa</option>
            {linguas_nativas.map((lingua, index) => (
              <option key={index} value={lingua}>{lingua}</option>
            ))}
          </select>
        </div>
        <div className="orkut-input">
          <label htmlFor="favorite_food" className="block text-gray-700 font-bold">Comida Favorita:</label>
          <input
            type="text"
            value={favoriteFood}
            id="favorite_food"
            required
            onChange={(e) => setFavoriteFood(e.target.value)}
            placeholder="Digite sua comida favorita"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="relationship" className="block text-gray-700 font-bold">Status de Relacionamento:</label>
          <select
            value={relationship}
            id="relationship"
            required
            onChange={(e) => setRelationship(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          >
            <option>Selecione seu status de relacionamento</option>
            {relacition_ship.map((relation, index) => (
              <option key={index} value={relation}>{relation}</option>
            ))}
          </select>
        </div>
        <div className="orkut-input">
          <label htmlFor="country" className="block text-gray-700 font-bold">País:</label>
          <select
            value={country}
            id="country"
            required
            onChange={(e) => setCountry(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          >
            <option>Selecione seu país</option>
            {principais_paises.map((pais, index) => (
              <option key={index} value={pais}>{pais}</option>
            ))}
          </select>
        </div>
        <div className="orkut-input">
          <label htmlFor="interesting" className="block text-gray-700 font-bold">Interesses:</label>
          <input
            type="text"
            value={interesting}
            id="interesting"
            required
            onChange={(e) => setInterest(e.target.value)}
            placeholder="Digite seus interesses"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="city" className="block text-gray-700 font-bold">Estado:</label>
          {country === 'Brasil' ? <select
            value={city}
            id="city"
            required
            onChange={(e) => setCity(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          >
            <option>Selecione seu estado</option>
            {districts?.map((cit, index) => (
              <option key={index}>{cit["UF-nome"]}</option>
            ))}
          </select> : <input
            type="text"
            value={city}
            id="city"
            required
            onChange={(e) => setCity(e.target.value)}
            placeholder="Digite seu estado"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />}
        </div>
        <div className="orkut-input">
          <label htmlFor="city" className="block text-gray-700 font-bold">Cidade:</label>
          {compareCity ? <select
            value={district}
            id="city"
            required
            onChange={(e) => setDistrict(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          >
            <option>Selecione sua cidade</option>
            {districts?.map((cit, index) => (
              city === cit["UF-nome"] &&
              <option key={index}>
                {cit["distrito-nome"]}
              </option>
            ))}
          </select> : <input
            type="text"
            value={district}
            id="city"
            required
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Digite sua cidade"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />}
        </div>
        <div className="orkut-input">
          <label htmlFor="work" className="block text-gray-700 font-bold">Trabalho:</label>
          <input
            type="text"
            value={work}
            id="work"
            required
            onChange={(e) => setWork(e.target.value)}
            placeholder="Digite seu trabalho"
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          />
        </div>
        <div className="orkut-input">
          <label htmlFor="education" className="block text-gray-700 font-bold">Educação:</label>
          <select
            value={education}
            id="education"
            required
            onChange={(e) => setEducation(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          >
            <option>Selecione a educação...</option>
            {educationList.map((edu, idx) => (
              <option key={idx} value={edu}>{edu}</option>
            ))}
          </select>
        </div>
        <div className="orkut-input">
          <label htmlFor="gender" className="block text-gray-700 font-bold">Gênero:</label>
          {kind === 'Outro' ? <input
            type="text"
            id="gender"
            value={gender}
            required
            onChange={(e) => setGender(e.target.value)}
            placeholder="Digite seu Gênero..."
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          /> : <select
            value={kind}
            id="gender"
            required
            onChange={(e) => setKind(e.target.value)}
            className="border rounded p-2 w-full bg-blue-400 text-slate-800 placeholder-slate-800"
          >
            <option>Selecione seu gênero</option>
            {genre.map((gen, idx) => (
              <option key={idx} value={gen}>{gen}</option>
            ))}
          </select>}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded orkut-button">Criar Usuário</button>
      </form>
    </>
  );
};

export default CreateUser;
