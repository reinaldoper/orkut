import fetchUsers from "../services/fetchUsers";
import { useEffect, useState } from "react";
import { User } from "../types/TUser"
import Alert from "../utils/alert";
import Icons from "../utils/Icons";
import LoadingPage from "../pages/LoadingPage";

const Content = () => {
  const [users, setUsers] = useState<User>()
  const [error, setError] = useState('')
  const [loadings, setLoading] = useState(false)
  
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
      setLoading(true)
      setUsers(message)
    }
    reqUser()
  }, [])


  const URL = users?.image ? `http://172.16.238.10:3000${users.image}` : ''


  return (
    <>
      {!loadings ? <div>
        <Alert errorAlert={{ error, setError }} />
        <LoadingPage />
      </div> : <div className="flex flex-wrap m-6">
        <div className="bg-slate-300">
          {error && <Alert errorAlert={{
            error,
            setError
          }} />}
          {users && (
            <div className="bg-blue-300 flex flex-col p-8 w-52 h-auto m-12 rounded-r-xl shadow-md">
              <img className="w-32 h-32 rounded-full p-2" src={URL} alt="This is me" title="This is me" />
              <p className="p-2 text-blue-800">{users.name}</p>
              <p className="p-2 text-gray-500">{users.country}</p>
              <p className="p-2 text-gray-500">{users.city}</p>
              <p className="p-2 text-gray-500">{users.interesting}</p>
              <p className="p-2 text-gray-500">{users.education}</p>
            </div>
          )}
        </div>

        <div className="flex mx-8 my-4 flex-col w-7/12">
          <div className="bg-gray-200 p-9 mt-8 rounded-tr-3xl shadow-md">
            <h2 className="text-blue-600 m-4">{users?.name}</h2>
            <p className="text-red-600 m-4">{users?.bio}</p>
            <Icons />
          </div>
          <div className="bg-gray-200 p-5 mt-6 h-auto shadow-md">
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">education: <span className="text-black">{users?.education}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">country: <span className="text-black">{users?.country}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">interest: <span className="text-black">{users?.interesting}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">genre: <span className="text-black">{users?.genro}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">relationship: <span className="text-black">{users?.relationship}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">birthdate: <span className="text-black">{users?.birthdate}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">favorite_books: <span className="text-black">{users?.favorite_books}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">favorite_food: <span className="text-black">{users?.favorite_food}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">favorite_music: <span className="text-black">{users?.favorite_music}</span></h3>
          </div>
        </div>
      </div>}

    </>
  )
}

export default Content;
