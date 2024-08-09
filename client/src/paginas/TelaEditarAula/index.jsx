import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useForm } from 'react-hook-form';
import Axios from "axios";
import { format } from 'date-fns';

const TelaEditarAula = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [alunosTurma, setAlunosTurma] = useState([]);
    const [alunosPresenca, setAlunosPresenca] = useState([]);
    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const location = useLocation();

    const objetoAula = location.state;


    useEffect(() => {
        if (user.id_educador === null) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                // Carrega as presenças
                const presencasResponse = await Axios.get('http://localhost:3001/getAllPresencasByIdAula', {
                    params: { id: objetoAula.id_aula }
                });
                setAlunosPresenca(presencasResponse.data);

                // Carrega os alunos da turma
                const alunosResponse = await Axios.get('http://localhost:3001/getAllAlunosByIdTurma', {
                    params: { id: objetoAula.id_turma }
                });
                setAlunosTurma(alunosResponse.data);
                
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                alert("Ocorreu um erro ao tentar carregar os dados. Por favor, tente novamente mais tarde.");
            }
        };

        carregarDados();
    }, [user.id_educador]);


    const presencaComAlunos = alunosPresenca.map(presenca => ({
        ...presenca,
        aluno: alunosTurma.find(alunoTurma => alunoTurma.id_aluno === presenca.id_aluno)
    }));

    const formatDate = (isoDate) => format(new Date(isoDate), 'yyyy-MM-dd');

    const defaultDateValue = formatDate(objetoAula.data_aula);



    const handlePresenteChange = (id, value) => {
        // console.log('Presente changed:', id, value); // Debugging
        const updatedAlunos = alunosPresenca.map(a =>
            a.id_aluno === id ? { ...a, presente: value } : a
        );
        setAlunosPresenca(updatedAlunos);

    };

    const handleJustificativaChange = (id, value) => {
        // console.log('Justificativa changed:', id, value); // Debugging
        const updatedAlunos = alunosPresenca.map(a =>
            a.id_aluno === id ? { ...a, justificativa: value } : a
        );
        setAlunosPresenca(updatedAlunos);
    };

    const onSubmit = async (data) => {

        console.log(data)

        // const todasFaltasRegistradas = alunosPresenca.every(aluno => aluno.presente !== '');

        // if (!todasFaltasRegistradas) {
        //     alert("Ainda há alunos sem registro.");
        //     return;
        // }


        // try {
        //     await Axios.post("http://localhost:3001/editarAulaById", {

        //         //nem id_turma (porque nao vou mudar turma -- pq teria q alterar todo o registro de aulas),
        //         //nem id_educador, nem o proprio id da aula. so muda data e descricao

        //         //isso tambem faz as mudanças no array de presenças
        //         id_aula: objetoAula.id_aula,
        //         data_aula: data.data_aula,
        //         descricao: data.descricao,

        //         listaAlunosPresenca: alunosPresenca
        //     });
        //     navigate('/home-educador');
        // } catch (error) {
        //     console.error('Erro ao tentar fazer login:', error);
        //     alert("Ocorreu um erro ao tentar inserir as turmas. Por favor, tente novamente mais tarde.");
        // }
    };

    return (
        <main className='mainPage'>
            <h1 className='titlePage'>Editar Aula</h1>
            <div className='divInputsMain'>
                <label>Data da Aula:</label>
                <input
                    type='date'
                    defaultValue={defaultDateValue}
                    placeholder='Escolha a data'
                    className={errors.data_aula ? "input-error" : ""}
                    {...register('data_aula', { required: true })}
                />
                {errors.data_aula && <p className="error-message">Data da aula é obrigatória</p>}

                <label>Selecionar Turma:</label>
                <select
                    className={errors.id_turma && "input-error"}
                    defaultValue="0"
                >
                    <option value="0" disabled>{objetoAula.projeto_nome}</option>

                </select>

                <label>Descrição:</label>
                <textarea
                    placeholder='Adicionar descrição da aula'
                    defaultValue={objetoAula.descricao}
                    className={errors.descricao ? "inputDescricao input-error" : "inputDescricao"}
                    {...register('descricao', { required: true })}
                    rows="5"
                    cols="50"
                />
                {errors.descricao && <p className="error-message">Descrição é obrigatória</p>}

                <label>Frequência:</label>

                {console.log(presencaComAlunos)}

              

                
                {/* {alunosPresenca.map(aluno => (
                    <CardAlunoFrequencia
                        key={aluno.id_aluno}
                        id={aluno.id_aluno}
                        nome_aluno={aluno.nome_aluno}
                        presente={aluno.presente}
                        justificativa={aluno.justificativa}
                        onPresenteChange={handlePresenteChange}
                        onJustificativaChange={handleJustificativaChange}
                    />
                ))} */}
            </div>
            <div className='divBotoesInputs'>
                <button className='botaoInputs' onClick={() => navigate('/home-educador')}>Voltar</button>
                <button className='botaoInputs' onClick={handleSubmit(onSubmit)}>Salvar Aula</button>
            </div>
        </main>
    );
};

export default TelaEditarAula;
