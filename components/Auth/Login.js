import React from 'react';
import axios from 'axios';
import Router from 'next/router';

const Login = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;

    axios.post('/api/auth/login', {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === 1) {
          // success
          console.log(res.data);
          props.handleLogin(res.data)
          // render home page
          Router.push('/admin');
        }
        if (res.data.status === 0) {
          console.log(res.data.msg);
        }
        if (res.data.status === 2) {
          console.log(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form
      onSubmit={handleSubmit}>
      <input
        name="email"
        readOnly
        autoFocus
        required
        type="email"
        // value while testing
        // value="test@tst.com"
        // value="does@not.exist"
        // value="test@test.com"
        value="endepointe@gmail.com"
        // value="ende@ende.com"
        // value="ende@test.com"
        placeholder="Email"
      ></input>
      <input
        name="password"
        readOnly
        required
        // value while testing
        value="1bs2b3bd1"
        // value="invalidpassword"
        type="password"
        placeholder="Password"
      ></input>
      <button
        type="submit"
      >Login</button>
    </form>
  )
}

export default Login;