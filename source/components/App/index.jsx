import React from 'react';

import { useSensor } from 'Hooks/useSensor';

import './styles.sass';

function App() {
  const sensorsData = useSensor();

  return (
    <div className='dashboard'>
      <h3 className='dashborad__title'>dashboard</h3>
      <div className='dashboard__sensors'>
        {
          sensorsData && Object.entries(sensorsData).map(([ name, data ], idx) => {
            return (
              <div key={idx} className='dashboard__sensor'>
                <h6 className='dashboard__sensor-title'>{name}</h6>
                {
                  data === null ?
                    <div className='dashboard__sensor-data--no-data'>no data</div> :
                    <div className='dashboard__sensor-data'>{data}</div>
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export { App };