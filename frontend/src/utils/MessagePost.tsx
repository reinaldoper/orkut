import { useNavigate } from 'react-router-dom';

const MessagePost = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/post-form');
  };
  return (
    <div className="flex flex-col mx-auto bg-white rounded-lg p-4 shadow-md w-full mb-4">
      <button
        type="button"
        onClick={handleNavigate}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        No que você está pensando...
      </button>
    </div>
  );
};

export default MessagePost;