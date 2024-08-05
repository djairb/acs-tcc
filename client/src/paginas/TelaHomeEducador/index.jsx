import React, { useContext, useEffect } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

const TelaHomeEducador = () => {

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    const navegarBotaoTurma = () =>{

        navigate('/tela-turmas');
    }

    const navegarBotaoCadastraAula = () =>{

        navigate('/tela-cadastrar-aula');
    }


    useEffect(() => {

        if(user.id===null){
            navigate('/login')
        }
        
      }, [user]);
  
    return (
        <main className='mainHome'>

            <div className='nomeBotoesDiv'>

                <h1>Olá, {user.nome}</h1>
                <div className='divBotoesHome'>

                    <button onClick={navegarBotaoTurma}>Ver Turmas</button>
                    <button onClick={navegarBotaoCadastraAula}>Registrar Aula</button>
                    
                    <button>Alterar</button>               
                    
                </div>

            </div>            

            <div className='aulasDiv'>

                        
                
                
                
            </div>

                    

        </main>

    );
};

export default TelaHomeEducador;