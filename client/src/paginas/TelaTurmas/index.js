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

    const navegarBotaoCadastrarTurma = () =>{

        navigate('/tela-detalhe-turma');
    }

    useEffect(() => {

        if(user.id===null){
            navigate('/login')
        }
        
      }, [user]);
  
    return (
        <main className='mainPage'>

            <h1 className='titlePage'>Turmas Cadastradas</h1>

            <div className='divInputsMain'></div>

            

            <div className='divBotoesInputs'>

                <button className='botaoInputs' onClick={navegarBotaoVoltar}>Voltar</button>

                <button className='botaoInputs' onClick={navegarBotaoCadastrarTurma}>Cadastrar Turma</button>


            </div>


        </main>

    );
};

export default TelaTurmas;