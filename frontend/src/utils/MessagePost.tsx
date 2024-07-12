import { useNavigate } from 'react-router-dom';

const MessagePost = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/post-form');
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 shadow-md w-full mb-4" style={{ border: '1px solid #D1E7F3', backgroundColor: '#EBF4FB' }}>
      <button
        type="button"
        onClick={handleNavigate}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        style={{ backgroundColor: '#B2D7FF', color: '#4A90E2', fontFamily: 'Arial, sans-serif' }}
      >
        No que você está pensando...
      </button>
    </div>
  );
};

export default MessagePost;