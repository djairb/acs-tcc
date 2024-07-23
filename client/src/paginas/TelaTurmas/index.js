import React, { useContext, useEffect } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

const TelaTurmas = () => {

    const navigate = useNavigate();

    const {user} = useContext(UserContext);
    
    const navegarBotaoVoltar = () =>{

        navigate('/home-educador');
    }

    useEffect(() => {

        if(user.id===null){
            navigate('/login')
        }
        
      }, [user]);
  
    return (
        <main className='mainPage'>

            <h1 className='titlePage'>Turmas Cadastradas</h1>

            <div className='divInputs'></div>

            <button className='botaoInputs' onClick={navegarBotaoVoltar}>Voltar</button>

            

        </main>

    );
};

export default TelaTurmas;