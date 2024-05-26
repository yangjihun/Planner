import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import './Login.css'; // CSS 파일을 불러옵니다.

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin1234" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("아이디나 비밀번호가 잘못되었습니다.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-animated">
      {/* 여러 개의 동그라미 추가 */}
      <div className="absolute top-16 left-16 w-20 h-20 bg-yellow-400 rounded-full shadow-xl transition duration-300 hover:bg-yellow-500"></div>
      <div className="absolute bottom-16 right-16 w-32 h-32 bg-blue-400 rounded-full shadow-xl transition duration-300 hover:bg-blue-500"></div>
      <div className="absolute top-32 right-32 w-24 h-24 bg-red-400 rounded-full shadow-xl transition duration-300 hover:bg-red-500"></div>
      <div className="absolute bottom-32 left-32 w-28 h-28 bg-green-400 rounded-full shadow-xl transition duration-300 hover:bg-green-500"></div>
      <div className="absolute top-24 left-1/3 w-16 h-16 bg-purple-400 rounded-full shadow-xl transition duration-300 hover:bg-purple-500"></div>
      <div className="absolute bottom-24 right-1/3 w-20 h-20 bg-pink-400 rounded-full shadow-xl transition duration-300 hover:bg-pink-500"></div>
      
      <div className="relative w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-2xl">
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">안녕하세요, 이민성님!</h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-4">
              <FaUserCircle className="text-6xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
