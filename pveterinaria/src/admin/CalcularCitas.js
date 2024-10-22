import React, { useState} from 'react';
import AdminLayout from './AdminLayout';
const CalcularCitas = () => {
  

 

  return (
    <AdminLayout>
      <div className='w-full'>
        <iframe 
          src="https://flask-fmp3.onrender.com/" 
          title="Embedded Page"
          width="100%" 
          height="600px" 
          style={{ border: 'none' }}
        />
      </div>
    </AdminLayout>
  );
};

export default CalcularCitas;
