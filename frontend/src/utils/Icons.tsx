
import { useNavigate } from "react-router-dom"

const Icons = () => {


  const navigate = useNavigate()


  const handleNavigatePost = () => {
    navigate('/post-user')
  }

  const handleNavigateFormPost = () => {
    navigate('/post-form')
  }


  return (
    <>
      <div className="flex">
        <button title="Post" onClick={handleNavigatePost} className="bg-blue-500 m-2 w-20 flex justify-center rounded">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 20v-5h2v6.988H3V15h1.98v5H17Z" />
            <path d="m6.84 14.522 8.73 1.825.369-1.755-8.73-1.825-.369 1.755Zm1.155-4.323 8.083 3.764.739-1.617-8.083-3.787-.739 1.64Zm3.372-5.481L10.235 6.08l6.859 5.704 1.132-1.362-6.859-5.704ZM15.57 17H6.655v2h8.915v-2ZM12.861 3.111l6.193 6.415 1.414-1.415-6.43-6.177-1.177 1.177Z" />
          </svg>
        </button>
        <button title="Post-form" onClick={handleNavigateFormPost} className="bg-blue-500 m-2 w-20 flex justify-center rounded">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
          </svg>
        </button>
        <button title="Like" className="bg-blue-500 m-2 w-20 flex justify-center rounded">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
          </svg>
        </button>
        <button title="" className="bg-blue-500 m-2 w-20 flex justify-center rounded">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default Icons
