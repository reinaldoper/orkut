import fetchUsers from "../services/fetchUsers";
import { useEffect, useState } from "react";
import { User } from "../types/TUser";
import Alert from "../utils/alert";
import Icons from "../utils/Icons";
import LoadingPage from "../pages/LoadingPage";
import '../styles/Content.css';

const Content = () => {
  const [users, setUsers] = useState<User>();
  const [error, setError] = useState('');
  const [loadings, setLoading] = useState(false);

  useEffect(() => {
    const reqUser = async () => {
      const token = localStorage.getItem('token') ?? '';
      const header = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.parse(token)
        }
      };
      const options = {
        method: 'GET',
        headers: header.headers,
      };
      const { message, error } = await fetchUsers('find', options);
      if (error) {
        setError(error);
        return;
      }
      setLoading(true);
      setUsers(message);
    };
    reqUser();
  }, []);

  const URL = users?.image ? `http://172.16.238.10:3000${users.image}` : '';

  return (
    <>
      {!loadings ? (
        <div>
          <Alert errorAlert={{ error, setError }} />
          <LoadingPage />
        </div>
      ) : (
        <div className="profile-container">
          {error && <Alert errorAlert={{ error, setError }} />}
          {users && (
            <div className="profile-card">
              <img className="profile-pic" src={URL} alt="This is me" title="This is me" />
              <p className="profile-name">{users.name}</p>
              <p className="profile-detail">{users.country}</p>
              <p className="profile-detail">{users.city}</p>
              <p className="profile-detail">{users.interesting}</p>
              <p className="profile-detail">{users.education}</p>
            </div>
          )}
          <div className="profile-info">
            <div className="profile-bio">
              <h2 className="bio-name">{users?.name}</h2>
              <p className="bio-text">{users?.bio}</p>
              <Icons />
            </div>
            <div className="profile-details">
              {[
                { label: 'Education', value: users?.education },
                { label: 'Country', value: users?.country },
                { label: 'Interest', value: users?.interesting },
                { label: 'Genre', value: users?.genro },
                { label: 'Relationship', value: users?.relationship },
                { label: 'Birthdate', value: users?.birthdate },
                { label: 'Favorite Books', value: users?.favorite_books },
                { label: 'Favorite Food', value: users?.favorite_food },
                { label: 'Favorite Music', value: users?.favorite_music }
              ].map((detail, index) => (
                <div key={index} className="profile-detail-item">
                  <h3 className="detail-label">{detail.label}:</h3>
                  <span className="detail-value">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
