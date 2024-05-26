import React, { useState } from "react";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // 여기에서 실제로 로그인 처리를 수행하고 성공 여부를 확인합니다.
    // 이 예제에서는 간단하게 'username'과 'password'가 일치하는지만 확인합니다.
    if (username === "admin1234" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("아이디나 비밀번호가 잘못되었습니다.");
    }
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직을 추가할 수도 있습니다.
    setIsLoggedIn(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {isLoggedIn ? (
          <div>
            <h2>안녕하세요, 이민성님!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
