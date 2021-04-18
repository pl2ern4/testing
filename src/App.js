import './App.scss';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState();
  useEffect(() => {
    /**
     * fetch method can be move to differet file with the header
     * if there are more than one call
     */
    fetch('/data.json'
      , {
        headers: {
          'Content-Type': 'application/json'
        }

      }
    )
      .then(res => res.json())
      .then(res => {
        setState(res);
      })
  }, []);
  if (!state) {
    return null;
  }

  const getValue = params => params?.content?.text;

  const handleClick = params => () => window.open(params);

  return (
    <div className="App">
      {
        state.offers.map((obj, key) => (
          <div className="row" key={`data-${key}`}>
            <div className="rank">{obj.rank}.</div>
            <span className="teriff-name">{getValue(obj.product)}</span>
            <div className="streaming">
              <div className="option download">
                <div className="text">Download</div>
                <div className="content">
                  <div>&darr;</div>
                  <span>{getValue(obj.contractTerm.downloadSpeed)}</span>
                </div>
              </div>
              <div className="option upload">
                <div className="text">Upload</div>
                <div className="content">
                  <div>&uarr;</div>
                  <span>{getValue(obj.contractTerm.uploadSpeed)}</span>
                </div>
              </div>
            </div>
            <ul className="teriff">
              {obj.remarks.map((o, k) => <li key={`teriff-${key}-${k}`}>{o.content.tooltip.header}</li>)}
            </ul>
            <div className="rate">
              <div>
                {getValue(obj.campaign.campaignSavings)}
              </div>
              <div>
                <button onClick={handleClick(obj.provider.logoUrl)}>
                  <span>
                    {`To ${getValue(obj.provider)}`}
                  </span>
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
