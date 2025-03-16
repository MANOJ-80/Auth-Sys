import { Link } from 'react-router-dom';

export default function HomePage() {
  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-center px-4">
      <h1 className="text-4xl font-extrabold text-green-600 mb-4 animate-fade-in-down">
        🎉 Welcome, {username}!
      </h1>
      <p className="text-lg text-gray-700 mb-8 animate-fade-in-up">You are successfully logged in.</p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-5 py-2.5 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          🔐 Go to Login
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2.5 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition transform hover:scale-105"
        >
          📝 Go to Register
        </Link>
      </div>
    </div>
  );
}
