import { useEffect, useState } from 'react';
import axios from 'axios';

const Table = (props) => {

  const [columnNames, setColumnNames] = useState({});
  const [colData, setColData] = useState([]);

  useEffect(() => {
    axios.get('/api/db/get-td', {
      params: {
        tablename: props.table
      }
    }).then(response => {
      setColumnNames(response.data);
      // console.log(Object.entries(columns));
      setColData(Object.entries(columnNames));
    }).catch(error => console.log(error));
  }, [])

  return (
    <div>
      <h3>{props.table}</h3>
      <div>
        <ul>
          {Object.keys(columnNames).map((col, key) =>
            <li key={key}>{col}</li>
          )}
        </ul>
        <ul>
          {colData.map((col, key) =>
            <li key={key}>{col}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Table; 