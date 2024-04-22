import React, { useState } from 'react'
import Link from 'next/link'
import { loginWithEmail, registerWithEmail, logout, loginGitHub } from '../lib/client'

import Button from './Button'
import Popout, { managePopout } from './Popout'
import { useAuth } from './AuthContext'


function Drawer(props) {
  return (
    <Popout hidden={!props.isVisible} pointerRight="14px" style={{ width: '160px', right: 0 }}>
      <div className="flex column">
        <Link href="/snippets">
          <Button large center padding="0.5rem 0" style={{ borderBottom: '1px solid' }}>
            <img src="/static/svg/snippets.svg" alt="Snippets page" width="16px" /> Prompts{' '}
          </Button>
        </Link>
        <Link href="/account">
          <Button large center padding="0.5rem 0" style={{ borderBottom: '1px solid' }}>
            <img
              src="/static/svg/person.svg"
              alt="Account"
              width="16px"
              style={{ left: '-2px', marginRight: 'calc(1rem - 3px)' }}
            />{' '}
            Account
          </Button>
        </Link>
        <Button large center padding="0.5rem 0" onClick={logout}>
          Sign Out
        </Button>
      </div>
      <style jsx>
        {`
          .column {
            flex-direction: column;
          }
          img {
            position: relative;
            margin-right: 1rem;
          }
        `}
      </style>
    </Popout>
  )
}

function LoginButton({ isVisible, toggleVisibility }) {
  const user = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailAuth = async () => {
    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
        alert("Please check your email to verify your account.");
      } else {
        await loginWithEmail(email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      alert(error.message); // 显示错误消息
    }
  };

  if (!firebase) {
    return null;
  }

  return (
    <div>
      {!user ? (
        <>
          <Button
            center
            border
            large
            padding="0 16px"
            color="white"
            className="profile-button"
            onClick={() => loginGitHub()}
          >
            <img height={20} src='/static/svg/github.svg' alt='GitHub' />
            Sign in/up with GitHub
          </Button>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button onClick={handleEmailAuth}>
            {isRegistering ? 'Register' : 'Login'}
          </Button>
          <Button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Switch to Login' : 'Switch to Register'}
          </Button>
        </>
      ) : (
        <>
          <Button
            center
            border
            large
            padding="0 16px"
            color="white"
            className="profile-button"
            onClick={toggleVisibility}
          >
            <img height={20} src={user.photoURL || '/static/svg/user.svg'} alt={user.displayName || 'User'} />
            {user.displayName || 'User'}
          </Button>
          <Drawer isVisible={isVisible} />
        </>
      )}
    </div>
  );
}

export default managePopout(LoginButton);
