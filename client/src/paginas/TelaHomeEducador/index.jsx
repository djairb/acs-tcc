import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import Axios from 'axios';

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

               
                {/* {aulas.length === 0 ? <p>Ainda sem alunos</p> :

                    aulas.map(aula => (

                        <CardEditarAluno

                            key={aluno.id_aluno}
                            id_aluno={aluno.id_aluno}
                            nome_aluno={aluno.nome_aluno}
                            idade={aluno.idade}
                            telefone={aluno.telefone}
                            setCount={setCount}
                            count={count}

                        />

                    ))
                } */}





            </div>



        </main>

    );
};

export default TelaHomeEducador;