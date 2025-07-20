import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    document.title = 'Home | TweetApp';
    
    const fetchTweets = async () => {
      const accessToken = localStorage.getItem('access');
      console.log('🧪 Access Token:', accessToken);

      if (!accessToken) {
        console.warn('⛔ No access token found. Redirecting to login...');
        navigate('/login');
        return;
      }

      

      try {
        const res = await fetch('/api/tweets/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        

        console.log('📡 API Response status:', res.status);

        if (res.ok) {
          const data = await res.json();
          console.log('✅ Tweets fetched:', data);
          setTweets(data);
        } else if (res.status === 401) {
          console.error('❌ Unauthorized. Token might be invalid/expired.');
          setError('Session expired. Please log in again.');
          navigate('/login');
        } else {
          const err = await res.text();
          console.error('❌ API Error:', err);
          setError('Failed to load tweets.');
        }
      } catch (err) {
        console.error('💥 Network error:', err);
        setError('Something went wrong. Check console.');
      }
    };

    fetchTweets(token);
  }, [navigate]);

  const followers = [
    { id: 1, name: 'David', username: '@david123' },
    { id: 2, name: 'Eva', username: '@eva_dev' },
    { id: 3, name: 'Frank', username: '@frankie' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="fixed top-0 left-0 h-full w-[220px] z-50">
        <Sidebar />
      </div>

      <div className="ml-[240px] w-full px-8 py-6 flex gap-8">
        <div className="w-[58%]">
          <div className="sticky top-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-xl p-4 z-40 mb-5">
            <h2 className="text-lg font-semibold text-white mb-2">Create a Post</h2>
            <textarea
              className="w-full p-3 border rounded-md bg-white/10 text-white placeholder:text-white/70 resize-none"
              placeholder="What's happening?"
              rows="3"
            />
            <button className="mt-3 bg-gradient-to-r from-green-400 via-lime-500 to-green-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition">
              Post
            </button>
          </div>

          {error && (
            <div className="text-red-400 font-semibold mb-4">
              ⚠️ {error}
            </div>
          )}

          {tweets.length === 0 && !error ? (
            <div className="text-white/70 text-center mt-6">No tweets yet. 🚫</div>
          ) : (
            tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-sm p-4 mb-5 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-green-300">{tweet.user}</h3>
                <p className="text-white mt-2">{tweet.content}</p>
              </div>
            ))
          )}
        </div>

        <div className="w-[30%]">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold text-white mb-3">Followers</h2>
            <ul className="space-y-4">
              {followers.map((follower) => (
                <li key={follower.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{follower.name}</p>
                    <p className="text-sm text-white/70">{follower.username}</p>
                  </div>
                  <button className="text-sm text-green-300 hover:underline">
                    View
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
