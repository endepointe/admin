import React,
{
  useState
} from 'react';
import Router from 'next/router';
import axios from 'axios';

const Register = (props) => {


  const [reg_error, setRegError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    let vpassword = e.target.elements.verify_password.value;

    if (password === vpassword) {
      axios.post('/api/auth/register', {
        email: email,
        password: password,
      })
        .then((res) => {
          if (res.data.status === 1) {
            console.log(res.data);
            props.handleLogin(res.data);
            Router.push('/admin');
          }
          if (res.data.status === 0) {
            console.log(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRegError(true);
      setTimeout(() => setRegError(false), 2500);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        required
        readOnly
        type="email"
        // value while testing
        // value="test@test.com"
        // value="endepointe@gmail.com"
        value="newuser@g.com"
        // value="ende@ende.com"
        // value="1@1.com"
        // value="ende@test.com"
        placeholder="Email"
      ></input>
      <input
        name="password"
        required
        readOnly
        type="password"
        // value while testing
        value="1bs2b3bd1"
        placeholder="Password"
      ></input>
      <input
        name="verify_password"
        required
        readOnly
        type="password"
        // value while testing
        value="1bs2b3bd1"
        placeholder="Verify password"
      ></input>
      {reg_error ? "Passwords do not match, try again" : null}
      <button
        type="submit"
      >Register</button>
    </form>
  )
}

export default Register;