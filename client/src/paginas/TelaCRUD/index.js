import './style.css'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';




function TelaCrud() {

    const location = useLocation();

  // Obtém o dado do state
    const dado = location.state;

  
  return (

    <div className='container-ola'>

        <h1>{dado.id}</h1>
        <h1>{dado.usuario}</h1>
        <h1>{dado.senha}</h1>      


    </div>
   

  );
}

export default TelaCrud;












