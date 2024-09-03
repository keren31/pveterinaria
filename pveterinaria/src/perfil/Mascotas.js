import React, { useState, useEffect } from 'react';



const DataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  return (
  
    
    <div>
      <iframe 
        src="https://flask-fmp3.onrender.com/" 
        title="Embedded Page"
        width="100%" 
        height="600px" 
        style={{ border: 'none' }}
      />
    </div>
    
  );
};

export default DataComponent;
