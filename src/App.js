import React, { useState, useEffect } from 'react';
import { request } from 'graphql-request';
import './App.css';

import lampImg from '../src/assets/lamp.jpeg';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { site } = await request(
        'https://api-eu-central-1.graphcms.com/v2/ckg825dbrqesa01z5hvx23e8b/master',
        
        `
          {
            site(where: {id: "ckg838qe00b910104n8owh7he"}) {
              page {
                fragmento {
                  name
                  singleText
                }
              }
            }
          }
        `
      )

      setData(site);
    }
    fetchData();
  }, []);


  const renderList = () => {
    return (
      data && data.page.map(item => (
        <div className="container_item">
          <h2>{item.fragmento.singleText[0]}</h2>
          {item.fragmento.singleText[0] === 'Suspendisse sit amet erat ex' 
            ? <img src={lampImg} alt="lâmpada" className="lampImg" />
            : <p>{item.fragmento.singleText[1]}</p>
          }
        </div>
      ))
    )
  }

  return (
    <div className="App">
      {renderList()}
    </div>
  );
}

export default App;
