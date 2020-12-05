import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f1'>
        {`Welcome, ${name}`}
      </div>
      <br />
      <br />
      <br />
      <div className='white f3'>
        {`# of images you've detected: `}
      </div>
      <br />
      <div className='white f1' style={{marginBottom: "50px"}}>
        {entries}
      </div>
    </div>
  );
}

export default Rank;