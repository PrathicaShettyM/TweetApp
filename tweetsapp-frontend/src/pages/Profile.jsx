import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    location: '',
    website: '',
    profileImage: '',
  });

  // 🔐 Check login status
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.warn('[Profile] No token found. Redirecting to /login');
      toast.warning('Please log in to access your profile.');
      navigate('/login');
    } else {
      console.info('[Profile] Token found, access granted');
      setLoading(false);
    }
  }, [navigate]);

  // 🖊️ Handle input changes
  const handleChange = (e) => {
    console.log(`[Profile] Field Changed: ${e.target.name} = ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📤 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[Profile] Submitting data:', formData);

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('[Profile] No token found at submit time');
      toast.error('You must be logged in to update your profile.');
      return;
    }

    try {
      const res = await fetch('/api/profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('[Profile] Profile updated successfully:', data);
        toast.success('Profile updated successfully!');
      } else {
        const errorText = await res.text();
        console.error('[Profile] Profile update failed:', errorText);
        toast.error('Failed to update profile. Please try again.');
      }
    } catch (err) {
      console.error('[Profile] Unexpected error:', err);
      toast.error('Something went wrong. Try again later.');
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">👤 Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            name="bio"
            placeholder="Bio (e.g. Developer, Security Enthusiast)"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            rows={3}
          />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g. Bangalore, India)"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="url"
            name="website"
            placeholder="Website / Portfolio URL"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="url"
            name="profileImage"
            placeholder="Profile Image URL"
            value={formData.profileImage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
