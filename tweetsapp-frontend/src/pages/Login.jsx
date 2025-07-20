import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log('🟡 Attempting login with:', { email, password });

  try {
    const response = await axios.post('/api/token/', {
      email,
      password,
    });

    console.log('🟢 Login response:', response.data);

    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);

    toast.success('Login successful!', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'colored',
    });

    console.log('🟢 Access token stored, redirecting to /explore');

    setTimeout(() => {
      navigate('/explore');
    }, 1600);
  } catch (error) {
    console.error('🔴 Login error:', error.response || error);

    if (error.response?.status === 401 || error.response?.status === 400) {
      toast.error('Invalid credentials!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
    } else {
      toast.error('Something went wrong!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
    }
  }
};

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login to TweetApp</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-6 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm">
            Don’t have an account? <a href="/signup" className="text-blue-600 underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
