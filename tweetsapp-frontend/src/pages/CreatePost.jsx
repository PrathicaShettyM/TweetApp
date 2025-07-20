import { useState } from 'react';

const CreatePost = ({ onPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim() === '') return;
    const newPost = {
      id: Date.now(),
      user: 'You',
      content,
    };
    onPost(newPost);
    setContent('');
  };

  return (
    <div className="sticky top-0 bg-white shadow-md rounded-xl p-4 z-40 mb-4">
      <h2 className="text-lg font-semibold mb-2">Create a Post</h2>
      <textarea
        className="w-full p-3 border rounded-md bg-gray-50 resize-none"
        placeholder="What's happening?"
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
