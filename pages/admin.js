import Link from 'next/link';
import {
  useEffect,
  useState
} from 'react';
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
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/"><a>logout</a></Link>
          </li>
          <li>
            <Link href="/"><a>Settings</a></Link>
          </li>
        </ul>
      </nav>
      <main>
        <aside>
          <h4>Database Contents</h4>
          <ul>
            {tables.map((table, key) =>
              <li key={key}>
                <button
                  name={table}
                  type="button"
                  onClick={showTable}>{table}</button>
              </li>)}
          </ul>
        </aside>
        <div>

        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {

  let tableNames = await db.manyOrNone("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';");

  return {
    props: {
      tableNames
    }
  }
}

export default Home;