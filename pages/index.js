import AuthForm from '../components/Auth/AuthForm';
import AdminHome from '../components/AdminHome';
import React,
{
  useState
} from 'react';
import Head from 'next/head';

export default function Home() {
  const [admin, setAdmin] = useState({ status: 0, msg: '' });
  const [login, allowLogin] = useState(false);

  const handleLogin = (obj) => {
    setAdmin({
      status: obj.status,
      msg: obj.msg
    })
    allowLogin(obj.status);
  }

  return (
    <div className="container">
      <Head>
        <title>Admin</title>
      </Head>
      {!login ?
        <AuthForm login={login} user={admin.msg} /> :
        <AdminHome login={login} user={admin.msg} />}
    </div>
  )
}
