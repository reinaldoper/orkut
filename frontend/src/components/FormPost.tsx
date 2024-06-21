import { useEffect, useState } from "react"
import fetchCategory from "../services/fetchCategory"
import { ICategory } from "../types/TCategory"
import Alert from "../utils/alert"
import { ISubmit } from "../types/TUser"
import fetchPosts from "../services/fetchPosts"
import { useNavigate } from "react-router-dom"


const FormPost = () => {
  const [error, setError] = useState('')
  const [category, setCategory] = useState<ICategory[]>()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const reqUser = async () => {
      const token = localStorage.getItem('token') ?? ''
      const header = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.parse(token)
        }
      }
      const options = {
        method: 'GET',
        headers: header.headers,
      };
      const { message, error } = await fetchCategory('', options)
      if (error) {
        setError(error)
        return
      }
      setCategory(message)
    }
    reqUser()
  }, [])

  const onSubmit = async (e: ISubmit) => {
    e.preventDefault()
    if (selectedCategoryId.length === 0) {
      setError('Preencha todos os campos!')
      return
    }
    const token = localStorage.getItem('token') ?? ''
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token)
      }
    }
    const body = JSON.stringify({
      title,
      content,
      categoryId: Number(selectedCategoryId)
    })
    const options = {
      method: 'POST',
      headers: header.headers,
      body
    };
    const { error } = await fetchPosts('', options)
    if (error) {
      setError(error)
      return
    }
    navigate('/content-page')
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={onSubmit} className="flex flex-col m-4 space-y-4 p-4">
        <label className="text-2xl text-blue-700" htmlFor="name">No que está pensando??</label>
        {error && <Alert errorAlert={{
          error,
          setError
        }} />}
        <label htmlFor="name">Titulo:</label>
        <input
          value={title}
          id="name"
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite um titulo..."
          className="border rounded p-2 w-full"
        />
        <label htmlFor="name">Conteúdo:</label>
        <textarea
          value={content}
          id="name"
          required
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite um conteúdo..."
          className="border rounded p-2 w-full"
          rows={10}
          cols={50}
          minLength={10}
        />
        <label htmlFor="name">Categoria:</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          name="category"
          className="p-2"
          required
        >
          <option>Default...</option>
          {category?.map((c, index) => (
            <option key={index} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-green-600 text-white p-2 rounded"
        >
          Publicar
        </button>

      </form>
    </div>
  )
}

export default FormPost
