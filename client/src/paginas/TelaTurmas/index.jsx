import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import DialogInserirTurma from '../../componentes/dialogInserirTurma/dialogInserirTurma';

import Axios from 'axios';
import CardTurma from '../../componentes/CardTurma/CardTurma';



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

    const [semTurma, setSemTurma] = useState(false);
    
    const [turmas, setTurmas] = useState([]);

    const [objetoTurma, setObjetoTurma] = useState({

        isCadastrada: false, //variavel pra saber se esse objeto é de uma turma cadastrada
        id_turma: null
        


    });

    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(false);

     

    useEffect(() => {
        // Código que deve ser executado quando `count` mudar
        const carregarTurmas = async () => {
            
            setLoading(true);

            try {
                
                const response = await Axios.get('http://localhost:3001/getAllTurmasByIdEducador', {
                    params: {
                        id: user.id_educador
                    }
                });
                setTurmas(response.data);
                setSemTurma(response.data.length === 0);
                setLoading(false);
                console.log(response);
              
        
            } catch (error) {
              console.error('Erro ao tentar fazer login:', error);
              alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
              setLoading(false);
            }
        };

        carregarTurmas();
        //
        
      }, [count]);


    const botaoNavegarPaginaTurma = () =>{

        
    
        
        // setOpenDialog(true);
        navigate('/tela-detalhe-turma', { state: objetoTurma });
        // passa o objeto pra ela pre-carregar. se tiver id o botao salvar dela vai chamar atualizar. se não, vai cadastrar a turma jogando os dados e a lista de alunos pro banco (não aceita no front cadastro sem turma -- não existe turma sem aluno
    }


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

            <div className='divInputsMain'>
                {loading && <div className="spinner"></div>}
                {semTurma && <p>não há turmas cadastradas</p>}

                {turmas.length>0 && turmas.map(turma => (

                    <CardTurma

                        key={turma.id_turma}
                        id_turma={turma.id_turma}
                        nome_turma={turma.nome_turma}
                        projeto={turma.projeto}
                        turno={turma.turno}
                        id_educador={turma.id_educador} 
                    
                    
                    />
     
                ))}

                
            </div>

            

            <div className='divBotoesInputs'>

                <button className='botaoInputs' onClick={navegarBotaoVoltar}>Voltar</button>

                <button className='botaoInputs' onClick={botaoNavegarPaginaTurma}>Inserir  Turma</button>


            </div>


        </main>

    );
};

export default TelaTurmas;