import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { GlobalActions } from '../../redux/slices/globalSlice';
import './SingIn.css';

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(GlobalActions.toggleLoading());
    setTimeout(() => {
      dispatch(GlobalActions.toggleLoading());
    }, 2000);
  }, []);

  const handleUsername = (inputUsername) => {
    setUsername(inputUsername.target.value);
  };

  const handlePassword = (inputPassword) => {
    setPassword(inputPassword.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (username !== '' && password !== '') {
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        history.push('/');
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="signin">
      <div>
        <div>
          <label>Username</label>
          <input onChange={handleUsername} />
        </div>
        <div>
          <label>Password</label>
          <input onChange={handlePassword} type="password" />
        </div>
        <div>
          <button type="submit">Log In</button>
          {!isLoggedIn && (
            <div className="warning">
              Please enter correct username and password
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
