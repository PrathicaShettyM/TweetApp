const Followers = () => {
  const followers = [
    { id: 1, name: 'David', username: '@david123' },
    { id: 2, name: 'Eva', username: '@eva_dev' },
    { id: 3, name: 'Frank', username: '@frankie' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">Followers</h2>
      <ul className="space-y-3">
        {followers.map((follower) => (
          <li
            key={follower.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p className="font-medium text-gray-800">{follower.name}</p>
              <p className="text-sm text-gray-500">{follower.username}</p>
            </div>
            <button className="text-sm text-purple-600 hover:underline">
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
