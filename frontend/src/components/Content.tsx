import fetchUsers from "../services/fetchUsers";
import { useCallback, useEffect, useState } from "react";
import { User } from "../types/TUser";
import Alert from "../utils/alert";
import Icons from "../utils/Icons";
import LoadingPage from "../pages/LoadingPage";
import '../styles/Content.css';
import fetchFollowing from "../services/fetchFollowing";
import { IFollowing } from "../types/IFollowing";

const Content = () => {
  const [users, setUsers] = useState<User>();
  const [error, setError] = useState('');
  const [loadings, setLoading] = useState(false);
  const [following, setFollowing] = useState<IFollowing[]>();
  const [followingUsers, setFollowingUsers] = useState<Map<number, { user: User, count: number }>>(new Map());

  const getToken = () => localStorage.getItem("token") ?? "";

  const handleUser = useCallback(async (id: number) => {
    const token = getToken();
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(token),
      },
    };
    const options = {
      method: "GET",
      headers: header.headers,
    };
    const { message }: { message: User } = await fetchUsers(`find/${id}`, options);
    return message;
  }, []);

  const reqUser = useCallback(async () => {
    const token = getToken();
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
  }, []);

  const reqFollowing = useCallback(async () => {
    const token = getToken();
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(token),
      },
    };
    const options = {
      method: "GET",
      headers: header.headers,
    };
    if (users?.id) {
      const { message, error } = await fetchFollowing(`${users.id}`, options);
      if (error) {
        setError(error);
        return;
      }
      setFollowing(message);
    }
  }, [users?.id]);

  useEffect(() => {
    reqUser();
  }, [reqUser]);

  useEffect(() => {
    reqFollowing();
  }, [reqFollowing]);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      if (following) {
        const usersData = await Promise.all(following.map((follow) => handleUser(follow.userId)));
        const userMap = new Map();
        usersData.forEach((user) => {
          const userId = user.id;
          if (userMap.has(userId)) {
            userMap.get(userId).count += 1;
          } else {
            userMap.set(userId, { user, count: 1 });
          }
        });
        setFollowingUsers(userMap);
      }
    };
    fetchFollowingUsers();
  }, [following, handleUser]);

  console.log(following, users?.id);

  const URL = users?.image ? `http://172.16.238.10:3000${users.image}` : '';
  const SRC = 'http://172.16.238.10:3000'

  return (
    <>
      {!loadings ? (
        <div>
          <Alert errorAlert={{ error, setError }} />
          <LoadingPage />
        </div>
      ) : (
        <div className="flex flex-wrap">
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
          <div className="profile-container">
            {followingUsers.size > 0 ? Array.from(followingUsers.values()).map(({ user, count }, index) => (
              <div key={index} className="flex flex-col items-center bg-white p-6 rounded-md shadow-lg w-3/4 mx-auto mt-10">
                <img className="w-10 h-10 rounded-lg hover:scale-105 transition-transform duration-200" src={`${SRC}${user.image ?? ''}`} alt={user.name} />
                <p>{user.name} (Followed by {count} users)</p>
              </div>
            )) : <div role="status" className="mt-12 ms-52">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>}
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
