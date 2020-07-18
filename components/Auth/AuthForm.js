import React,
{
  useState
} from 'react';
import Login from './Login';
import Register from './Register';

const AuthForm = (props) => {
  const [login, setLogin] = useState(true);

  const switchAuthType = (e) => {
    setLogin(!login);
    if (e.target.textContent === 'Need an account? Register') {
      e.target.textContent = 'Have an account? Login';
    } else {
      e.target.textContent = 'Need an account? Register';
    }
  }

  return (
    <div>
      {login ?
        <Login handleLogin={props.handleLogin} /> :
        <Register handleLogin={props.handleLogin} />}
      <button
        onClick={switchAuthType}
        type='button'>
        Need an account? Register
      </button>
    </div>
  )
}

export default AuthForm;