import React from 'react';
import { loginEndpoint } from '../../spotify';

export default function Login() {
  const loginPageStyle = {
    backgroundColor: 'black',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexDirection: 'column',
  };

  const logoStyle = {
    width: '25%',
    borderRadius:"50%"
  };

  const loginBtnStyle = {
    width: '200px',
    padding: '15px 0',
    textAlign: 'center',
    backgroundColor: 'aliceblue',
    borderRadius: '50px',
    fontWeight: 600,
    marginTop: '28%',
  };

  const anchorStyle = {
    textDecoration: 'none',
  };

  return (
    <div style={loginPageStyle}>
      <img src="girl.png" alt="music-logo" style={logoStyle} />
      <a href={loginEndpoint} style={anchorStyle}>
        <div style={loginBtnStyle}>LOG IN</div>
      </a>
    </div>
  );
}
