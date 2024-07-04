import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { User } from "../types/TUser"
import fetchUsers from "../services/fetchUsers"
import LoadingPage from "../pages/LoadingPage"


const Posts = () => {
  const [users, setUsers] = useState<User>()
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const getToken = () => localStorage.getItem('token') ?? ''

  const reqUser = useCallback(async () => {
    const token = getToken();
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
    const { message } = await fetchUsers(`find/${Number(id)}`, options)
    setLoading(true)
    setUsers(message)
  }, [id]);

  useEffect(() => {
    reqUser()
  }, [reqUser]);

  console.log(users);

  const URL = users?.image ? `http://172.16.238.10:3000${users.image}` : ''
  return (
    <>
      {!loading ? <LoadingPage /> :
        <div className="flex flex-col items-center justify-center">
          <img className="w-12 h-12 rounded-full p-2 hover:scale-150" src={URL} alt="This is me" title="This is me" />
          <h1 className="text-2xl font-bold">{users?.city} {users?.bio}</h1>
          <p className="text-xl">{users?.email}</p>
        </div>
      }
    </>
  )
}

export default Posts
