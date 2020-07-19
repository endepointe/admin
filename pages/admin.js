import Link from 'next/link';
import Router from 'next/router';
import {
  useEffect,
  useState
} from 'react';
import Table from '../components/Table';
import { db } from '../db/pgp';
import axios from 'axios';

const Home = ({ tableNames }) => {

  const [tables, setTables] = useState([]);
  const [content, setContent] = useState({});

  useEffect(() => {
    let t = [];
    for (let i = 0; i < tableNames.length; ++i) {
      t.push(tableNames[i].tablename)
    }
    setTables(t);
    t = null;
  }, []);

  const showTable = (e) => {
    console.log(e.target.name);
    populateContent(e.target.name);
  }

  const populateContent = (name) => {
    axios.get('/api/db/get-td', {
      params: {
        tablename: name
      }
    })
      .then(res => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; ++i) {

        }
      })
      .catch(err => console.log(err));
  }

  const logout = () => {
    Router.push('/');
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button
              onClick={logout}
              type="button">logout</button>
          </li>
          <li>
            <Link href="/"><a>Settings</a></Link>
          </li>
        </ul>
      </nav>
      <main>
        <aside>
          <h4>Side Menu</h4>
          <ul>
            <li>menu item</li>
            <li>menu item</li>
          </ul>
        </aside>
        {tables.map((table, key) =>
          <section key={key}>
            <Table table={table} />
          </section>
        )}
      </main>
    </div>
  )
}

export async function getStaticProps() {

  let tableNames = await db.manyOrNone("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';");

  console.log(tableNames[1].tablename);

  return {
    props: {
      tableNames
    }
  }
}

export default Home;