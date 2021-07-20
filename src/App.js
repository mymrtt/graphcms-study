// Libs
import React, { useState, useEffect } from 'react';
import { request } from 'graphql-request';

// Styles
import './App.css';

export async function getData() {
  const { site } = await request(
    'https://api-eu-central-1.graphcms.com/v2/ckg825dbrqesa01z5hvx23e8b/master',
    
    `
      {
        site(where: {id: "ckg838qe00b910104n8owh7he"}) {
          page {
            fragmento {
              id
              name
              singleText
            }
          }
        }
      }
    `
  )

  if(!site.page.length) return null;

  return site.page;
}

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();

      if (data) {
        setData(data)
      }
    }

    fetchData();
  }, []);

  const renderList = () => {
    return data?.map(({ fragmento }) => (
      <div 
        key={fragmento?.id}
        className="card" 
      >
        <h2>{fragmento?.singleText[0]}</h2>
        <p>{fragmento?.singleText[1]}</p>
      </div>
    ))
  }

  return (
    <div className="App">
      {renderList()}
    </div>
  );
}
