import { ISubmit } from "../types/TUser"

const CreateUser = () => {

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
        <button type="submit">Cadastrar</button>
      </form>
    </>
  )
}

export default CreateUser
