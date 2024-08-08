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

    const [turmas, setTurmas] = useState([]);

    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(false);

     

    useEffect(() => {
        // Código que deve ser executado quando `count` mudar

        // nao use useEffect pra renderizar componente.
        //usa ele aqui pra atualizar a lista que recebe a requisição - quando um componente é adicionado
        const carregarTurmas = async () => {
            
            setLoading(true);

            try {
                
                const response = await Axios.get('http://localhost:3001/getAllTurmasByIdEducador', {
                    params: {
                        id: user.id_educador
                    }
                });
                setTurmas(response.data);
                
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
        
      }, [count, user.id_educador]);


    const botaoNavegarPaginaTurma = () =>{      
    
        
        navigate('/tela-cadastrar-turma');
        
    }

    return (
        <main className='mainPage'>        


            <h1 className='titlePage'>Turmas Cadastradas</h1>

            <div className='divInputsMain'>
                {loading && <div className="spinner"></div>}
                {turmas.length===0 ? <p>não há turmas cadastradas</p> :

                turmas.length>0 && turmas.map(turma => (

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

                <button className='botaoInputs' onClick={botaoNavegarPaginaTurma}>Inserir Turma</button>


            </div>


        </main>

    );
};

export default TelaTurmas;