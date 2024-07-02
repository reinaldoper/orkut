import { useEffect, useState, useCallback } from "react"
import { User } from "../types/TUser"
import fetchUsers from "../services/fetchUsers"

const ReqUserById = ({ id }: { id: number }) => {
  const [users, setUsers] = useState<User>()
  const [loading, setLoading] = useState(false)


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
      {loading &&
        <img className="w-12 h-12 rounded-full p-2 hover:scale-150" src={URL} alt="This is me" title="This is me" />
      }
    </>
  )
}

export default ReqUserById
