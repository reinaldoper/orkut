import NavLink from "./NavLink";
import fetchUsers from "../services/fetchUsers";
import { useEffect, useState } from "react";
import { User } from "../types/TUser"
import Alert from "../utils/alert";

const Content = () => {
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


  const URL = users?.image ? `http://172.16.238.10:3000${users.image}` : ''


  return (
    <div>
      <NavLink />
      <div className="flex flex-wrap m-6">
        <div className="bg-slate-300">
          {error && <Alert errorAlert={{
            error,
            setError
          }} />}
          {users && (
            <div className="bg-blue-300 flex flex-col p-8 w-52 h-auto m-8 rounded-r-xl shadow-md">
              <img className="w-32 h-32 rounded-full p-2" src={URL} alt="This is me" title="This is me" />
              <p className="p-2 text-blue-800">{users.name}</p>
              <p className="p-2 text-gray-500">{users.country}</p>
              <p className="p-2 text-gray-500">{users.city}</p>
              <p className="p-2 text-gray-500">{users.interesting}</p>
              <p className="p-2 text-gray-500">{users.education}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col w-7/12">
          <div className="bg-gray-200 p-9 mt-8 rounded-tr-3xl shadow-md">
            <h2 className="text-blue-600 m-4">{users?.name}</h2>
            <div className="flex">
              <button className="bg-blue-500 m-2 w-20 flex justify-center rounded">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z" />
                </svg>
              </button>
              <button className="bg-blue-500 m-2 w-20 flex justify-center rounded">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                </svg>
              </button>
              <button className="bg-blue-500 m-2 w-20 flex justify-center rounded">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                </svg>
              </button>
              <button className="bg-blue-500 m-2 w-20 flex justify-center rounded">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-gray-200 p-5 mt-6 h-auto shadow-md">
            <h3 className="text-gray-500 m-4">education: <span className="text-black">{users?.education}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">country: <span className="text-black">{users?.country}</span></h3>
            <h3 className="text-gray-500 m-4">interest: <span className="text-black">{users?.interesting}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">genre: <span className="text-black">{users?.genro}</span></h3>
            <h3 className="text-gray-500 m-4">relationship: <span className="text-black">{users?.relationship}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">birthdate: <span className="text-black">{users?.birthdate}</span></h3>
            <h3 className="text-gray-500 m-4">favorite_books: <span className="text-black">{users?.favorite_books}</span></h3>
            <h3 className="text-gray-500 p-2 m-4 bg-blue-400 rounded">favorite_food: <span className="text-black">{users?.favorite_food}</span></h3>
            <h3 className="text-gray-500 m-4">favorite_music: <span className="text-black">{users?.favorite_music}</span></h3>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Content;
