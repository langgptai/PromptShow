import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in: ", userCredential.user);
      // 处理用户登录后的逻辑
    } catch (error) {
      console.error("Error logging in: ", error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
