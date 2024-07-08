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
        <div className="flex flex-wrap justify-center">
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
          <div className="profile-container flex flex-col">
            <h1 className="text-blue-800">Following</h1>
            {followingUsers.size > 0 ? Array.from(followingUsers.values()).map(({ user, count }, index) => (
              <div key={index} className="flex flex-col items-center bg-white p-6 rounded-md shadow-lg w-3/4 mx-auto mt-10">
                <img className="w-10 h-10 rounded-lg hover:scale-105 transition-transform duration-200" src={`${SRC}${user.image ?? ''}`} alt={user.name} />
                <p className="text-blue-500">{user.name} (Followed by {count} users)</p>
              </div>
            )) : <div className="text-blue-500">
              <span className="">You don´t have follow</span>
            </div>}
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
