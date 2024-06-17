import { ISubmit } from "../types/TUser"
import { ChangeEvent, useState } from "react"

const CreateUser = () => {
  const [file, setFile] = useState<File | null>(null)
  const [age, setAge] = useState<string | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  console.log('file', file?.name.slice(-3));
  console.log('age', age);
  
  

  const onSubmit = (e: ISubmit) => {
    e.preventDefault()
  }

  return (
    <>
      <h1 className="bg-blue-500 p-4">Cheguei aqui no cadastro!</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" />
        </div>
        <div>
          <label>Age:</label>
          <input type="date" id="age" onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" id="image" onChange={handleFileChange} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </>
  )
}

export default CreateUser
