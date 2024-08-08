import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import Axios from 'axios';
import CardAula from '../../componentes/CardAula/CardAula';

const TelaHomeEducador = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const navegarBotaoTurma = () => {

        navigate('/tela-turmas');
    }

    const navegarBotaoCadastraAula = () => {

        navigate('/tela-cadastrar-aula');
    }


    const [aulas, setAulas] = useState([]);
    const [turmas, setTurmas] = useState([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {

        if (user.id_educador === null) {
            navigate('/login')
        }

    }, [user]);

    useEffect(() => {

        const carregarTurmas = async () => {

            setLoading(true);

            try {
                const [turmasResponse, aulasResponse] = await Promise.all([
                    Axios.get('http://localhost:3001/getAllTurmasByIdEducador', {
                        params: {
                            id: user.id_educador
                        }
                    }),
                    Axios.get('http://localhost:3001/getAllAulasByIdEducador', {
                        params: {
                            id: user.id_educador
                        }
                    })
                ]);
                setAulas(aulasResponse.data);
                setTurmas(turmasResponse.data);
                setLoading(false);
                
                
                
            } catch (error) {
                console.error('Erro ao tentar fazer login:', error);
                alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
                setLoading(false);
            }
        };

        carregarTurmas();
        //

    }, []);

    const aulasComTurmas = aulas.map(aula => ({
        ...aula,
        turma: turmas.find(turma => turma.id_turma === aula.id_turma)
      }));

    return (
        <main className='mainHome'>

            <div className='nomeBotoesDiv'>

                <h1>Bem-vindo, {user.nome}!</h1>
                <div className='divBotoesHome'>

                    <button onClick={navegarBotaoTurma}>Ver Turmas</button>
                    <button onClick={navegarBotaoCadastraAula}>Registrar Aula</button>

                    <button>Alterar</button>

                </div>

            </div>

            <div className='aulasDiv'>

                {loading && <div className="spinner"></div>}

                {console.log(aulasComTurmas)}
                                       
           
                {aulas.length === 0 ? <p>Ainda sem aulas</p> :

                    aulasComTurmas.map(aula => (

                        <CardAula

                            key={aula.id_aula}
                            id_aula={aula.id_aula}
                            id_educador={aula.id_educador}
                            id_turma={aula.id_turma}
                            projeto_nome={aula.turma.projeto}
                            data_aula={aula.data_aula}
                            turma_aula={aula.turma.nome_turma}
                            turno_aula={aula.turma.turno}
                            

                        />

                        
                        

                    ))
                }





            </div>



        </main>

    );
};

export default TelaHomeEducador;