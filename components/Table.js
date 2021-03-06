import { useEffect, useState } from 'react';
import axios from 'axios';

const Table = (props) => {

  const [columnNames, setColumnNames] = useState({});

  useEffect(() => {
    axios.get('/api/db/get-td', {
      params: {
        tablename: props.table
      }
    }).then(response => {
      setColumnNames(response.data);
      // console.log(Object.entries(columns));
    }).catch(error => console.log(error));
  }, [])

  console.log(columnNames);

  return (
    <div>
      <h3>{props.table}</h3>
      <div>
        {Object.keys(columnNames).map((col, key) =>
          <div key={key}>{col}{key}</div>
        )}
      </div>
    </div>
  )
}

export default Table; 