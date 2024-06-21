import { useEffect, useState } from "react"
import fetchPosts from "../services/fetchPosts"
import { IPost } from "../types/TUser"
import Alert from "../utils/alert"

const ListPost = () => {
  const [posts, setPosts] = useState<IPost[]>()
  const [error, setError] = useState('')

  useEffect(() => {
    const reqPosts = async () => {
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
      const { error, message } = await fetchPosts('', options)
      if (error) {
        setError(error)
        return
      }
      setPosts(message)
    }
    reqPosts()
  }, [])

  console.log(posts);

  return (
    <div className="flex flex-col mx-auto bg-slate-500 p-3 overflow-y-auto flex-wrap justify-center text-center w-9/12">
      {error && <Alert errorAlert={{
        error,
        setError
      }} />}
      {posts?.map((post) => (
        <div key={post.id} className="bg-gray-200 p-9 mt-8 rounded-tr-3xl shadow-md">
          <h2 className="text-blue-600 m-4">{post.title}</h2>
          <p>{post.content}</p>
          <button className="flex items-center justify-center gap-2" type="button">
            <svg className="w-6 h-6 text-gray-800 dark:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
            </svg>
            <span>{post.likes}</span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default ListPost
