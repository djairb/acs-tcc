import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import DialogInserirTurma from '../../componentes/DialogInserirTurma/DialogInserirTurma';


const TelaTurmas = () => {

    const navigate = useNavigate();

    const {user} = useContext(UserContext);
    
    const navegarBotaoVoltar = () =>{

        navigate('/home-educador');
    }

    const [openDialog, setOpenDialog] = useState(false); 

    const botaoCadastrarTurma = () =>{

        setOpenDialog(true);
    }

    useEffect(() => {

        if(user.id_educador===null){
            navigate('/login')
        }
        
      }, [user]);

   
  
    return (
        <main className='mainPage'>

            <DialogInserirTurma

                open={openDialog}
                setOpenDialog={setOpenDialog}
                id_educador = {user.id_educador}

            
            
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