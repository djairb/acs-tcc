import React, { useContext, useEffect } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

const TelaHomeEducador = () => {

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    console.log(user);

    useEffect(() => {

        if(user.id===null){
            navigate('/login')
        }
        
      }, [user]);
  
    return (
        <main className='mainHome'>

            <h1>Olá, {user.nome}!</h1>
            <div className='divBotoesHome'>

                <button>Ver Turmas</button>               
                
                
            </div>

            <div className='aulasDiv'>

                <div className='teste'></div>
                <div className='teste'></div>
                <div className='teste'></div>
                <div className='teste'></div>
                <div className='teste'></div>
                <div className='teste'></div>
                
                
                
                
            </div>        

        </main>

    );
};

export default TelaHomeEducador;