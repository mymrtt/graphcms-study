import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';

function App() {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { sites } = await request(
        'https://api-eu-central-1.graphcms.com/v2/ckg2jm369p4hj01xogwx1b4pl/master',
        `
      { 
        sites {
          name
          page {
            title
            subtitle
            stage
            customFragment {
              name
            }
          }
        }
      }
    `
      );

      setList(sites);
    };
    fetchProducts();
  }, []);


  const renderList = () => {
    return (
      list ? (
        <div>
          <p>{list[0].name}</p>
        </div>
      ) : null
    )
  }

  return (
    <div className="App">
      {renderList()}
    </div>
  );
}

export default App;
