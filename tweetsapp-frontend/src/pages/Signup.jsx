import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register/', {
        full_name: fullName, // match backend naming
        username,
        email,
        password,
      });

      console.log('Signup successful:', response.data);
      alert('Account created successfully!');
      window.location.href = '/login'; // optional redirect
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Signup failed!');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <form
          onSubmit={handleSignup}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Create a TweetApp Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 mb-4 border rounded-md"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 mb-4 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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
            Sign Up
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account? <a href="/login" className="text-blue-600 underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
