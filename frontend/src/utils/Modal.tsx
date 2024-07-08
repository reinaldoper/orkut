import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { IModal } from "../types/TModal";
import fetchPhotos from "../services/fetchPhotos";
import Alert from "./alert";

const Modal = ({ onclick, id }: IModal) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState<File | null>(null);
  const [error, setError] = useState('');

  const getToken = () => localStorage.getItem('token') ?? '';

  const handleToggleModal = () => {
    setIsVisible(!isVisible);
    onclick(!isVisible);
  };

  const handleFile = useCallback(async (event: FormEvent<HTMLFormElement>, id: number) => {
    event.preventDefault();
    if (title.length === 0 && url === null) {
      setError('Preencha os campos.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    if (url) {
      formData.append('url', url);
    }
    formData.append('postId', id.toString());

    const token = getToken();
    const header = {
      headers: {
        'Authorization': JSON.parse(token)
      }
    };
    const options = {
      method: 'POST',
      headers: header.headers,
      body: formData
    };
    const { error } = await fetchPhotos('', options);
    if (error) {
      setError(error);
    } else {
      setTitle('');
      setUrl(null);
      setError('');
    }
  }, [title, url]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileType = event.target.files[0].name.slice(-3);
      if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'peg') {
        setError('Apenas arquivos de imagem são permitidos.');
        event.target.value = '';
        return;
      }
      setUrl(event.target.files[0]);
    } else {
      setUrl(null);
    }
  };

  return (
    <>
      <button
        onClick={handleToggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Open Photo
      </button>

      {isVisible && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden={!isVisible}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          {error && <Alert errorAlert={{ error, setError }} />}
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Save your photos here
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleToggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" encType="multipart/form-data" onSubmit={(event) => handleFile(event, id)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your title
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Titulo da foto"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your photo
                    </label>
                    <input
                      type="file"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      onChange={handleFileChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save photo
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleModal}
                    className="w-full text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Close modal
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;