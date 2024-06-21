import { useEffect, useState } from "react"
import { User } from "../types/TUser"
import fetchUsers from "../services/fetchUsers"
import Alert from "../utils/alert"


const Posts = () => {
  const [users, setUsers] = useState<User>()
  const [error, setError] = useState('')

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
      const { message, error } = await fetchUsers('find', options)
      if (error) {
        setError(error)
        return
      }
      setUsers(message)
    }
    reqUser()
  }, [])

  console.log(users);
  
  
  return (
    <div className="flex">
      {error && <Alert errorAlert={{
            error,
            setError
          }} />}
      <h1>Post</h1>
    </div>
  )
}

export default Posts
