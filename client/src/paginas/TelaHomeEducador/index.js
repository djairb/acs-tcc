import React, { useContext, useEffect } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

const TelaHomeEducador = () => {

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    useEffect(() => {

        if(user.id===null){
            navigate('/login')
        }
        
      }, [user]);
  
    return (
        <main className='mainHome'>

            <h1>Olá, {user.nome}!</h1>
            {console.log(user)}        

        </main>

    );
};

export default TelaHomeEducador;