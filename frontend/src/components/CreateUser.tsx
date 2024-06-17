import { ISubmit } from "../types/TUser"
import { ChangeEvent, useState } from "react"
import fetchUsers from '../services/fetchUsers'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const CreateUser = () => {
  const [file, setFile] = useState<File | null>(null)
  const [age, setAge] = useState<string | null>(null)
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

  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileType = event.target.files[0].name.slice(-3);
      if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'peg') {
        alert('Apenas arquivos de imagem são permitidos.');
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
    formData.append('gender', gender ? gender : '');
    const options = {
      method: 'POST',
      body: formData,
    };
    const data = await fetchUsers(options)
    if (data) navigate('/');
  }

  return (
    <>
      <h1 className="bg-blue-300 p-4 flex">
        <Link to="/">Home</Link>
      </h1>
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
            placeholder="Digite sua senha"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="age">Data de Nascimento:</label>
          <input
            type="date"
            id="age"
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
            onChange={(e) => setWork(e.target.value)}
            placeholder="Digite sua ocupação"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="education">Educação:</label>
          <input
            type="text"
            value={education}
            id="education"
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Digite seu nível de educação"
            className="border rounded p-2 w-full"
          />
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
