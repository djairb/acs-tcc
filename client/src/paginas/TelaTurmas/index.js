import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import DialogInserirTurma from '../../componentes/dialogInserirTurma/dialogInserirTurma';


const TelaTurmas = () => {

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    useEffect(() => {

        if(user.id_educador===null){
            navigate('/login')
        }
        
      }, [user]);
    
    const navegarBotaoVoltar = () =>{

        navigate('/home-educador');
    }

    const [openDialog, setOpenDialog] = useState(false); 

    const botaoCadastrarTurma = () =>{

        setOpenDialog(true);
    }    

    const [count, setCount] = useState(0);

    useEffect(() => {
        // Código que deve ser executado quando `count` mudar
        console.log(`O valor de count é ${count}`);
        
      }, [count]);

    const ativarEffect = () =>{
        setCount(count + 1);
    }

   
  
    return (
        <main className='mainPage'>

            <DialogInserirTurma

                open={openDialog}
                setOpenDialog={setOpenDialog}
                id_educador = {user.id_educador}
                // passar a função pra ativar o effect que faz a requisição de novo
                ativarEffect = {ativarEffect}

            
            
            />

            <h1 className='titlePage'>Turmas Cadastradas</h1>

            <div className='divInputsMain'></div>

            

            <div className='divBotoesInputs'>

                <button className='botaoInputs' onClick={navegarBotaoVoltar}>Voltar</button>

                <button className='botaoInputs' onClick={botaoCadastrarTurma}>Inserir  Turma</button>


            </div>


        </main>

    );
};

export default TelaTurmas;