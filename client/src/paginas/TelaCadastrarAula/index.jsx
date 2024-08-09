import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useForm } from 'react-hook-form';
import Axios from "axios";
import CardAlunoFrequencia from '../../componentes/CardAlunoFrequencia/CardAlunoFrequencia';

const TelaCadastrarAula = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [turmas, setTurmas] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    useEffect(() => {
        if (user.id_educador === null) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const carregarTurmas = async () => {
            try {
                const response = await Axios.get('http://localhost:3001/getAllTurmasByIdEducador', {
                    params: { id: user.id_educador }
                });
                setTurmas(response.data);
            } catch (error) {
                console.error('Erro ao carregar turmas:', error);
                alert("Ocorreu um erro ao tentar carregar as turmas. Por favor, tente novamente mais tarde.");
            }
        };
        carregarTurmas();
    }, [user.id_educador]);


    const selectedTurmaId = watch('id_turma');

    useEffect(() => {
        if (selectedTurmaId) {
            const carregarAlunos = async () => {
                try {
                    const response = await Axios.get('http://localhost:3001/getAllAlunosByIdTurma', {
                        params: { id: selectedTurmaId }
                    });
                    const alunosAtualizados = response.data.map(aluno => ({
                        ...aluno,
                        presente: '', // Inicialmente sem seleção
                        justificativa: ''
                    }));
                    setAlunos(alunosAtualizados);
                } catch (error) {
                    console.error('Erro ao carregar alunos:', error);
                    alert("Ocorreu um erro ao tentar carregar os alunos. Por favor, tente novamente mais tarde.");
                }
            };
            carregarAlunos();
        }
    }, [selectedTurmaId]);

    const handlePresenteChange = (id, value) => {
        // console.log('Presente changed:', id, value); // Debugging
        const updatedAlunos = alunos.map(a =>
            a.id_aluno === id ? { ...a, presente: value } : a
        );
        setAlunos(updatedAlunos);

    };

    const handleJustificativaChange = (id, value) => {
        // console.log('Justificativa changed:', id, value); // Debugging
        const updatedAlunos = alunos.map(a =>
            a.id_aluno === id ? { ...a, justificativa: value } : a
        );
        setAlunos(updatedAlunos);
    };

    const onSubmit = async (data) => {

        const todasFaltasRegistradas = alunos.every(aluno => aluno.presente !== '');

        if (!todasFaltasRegistradas) {
            alert("Ainda há alunos sem registro.");
            return;
        }

        
        try {
            await Axios.post("http://localhost:3001/cadastrarAula", {
                id_turma: data.id_turma,
                data_aula: data.data_aula,
                descricao: data.descricao,
                id_educador: user.id_educador,
                listaAlunos: alunos
            });
            navigate('/home-educador');
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            alert("Ocorreu um erro ao tentar inserir as turmas. Por favor, tente novamente mais tarde.");
        }
    };

    return (
        <main className='mainPage'>
            <h1 className='titlePage'>Cadastrar Aula</h1>
            <div className='divInputsMain'>
                <label>Data da Aula:</label>
                <input
                    type='date'
                    placeholder='Escolha a data'
                    className={errors.data_aula ? "input-error" : ""}
                    {...register('data_aula', { required: true })}
                />
                {errors.data_aula && <p className="error-message">Data da aula é obrigatória</p>}

                <label>Selecionar Turma:</label>
                <select
                    className={errors.id_turma && "input-error"}
                    defaultValue="0"
                    {...register("id_turma", { validate: (value) => value !== "0" })}
                >
                    <option value="0">Selecionar Projeto</option>
                    {turmas.length === 0 ? (
                        <option value="" disabled>Não há turmas cadastradas</option>
                    ) : (
                        turmas.map(turma => (
                            <option key={turma.id_turma} value={turma.id_turma}>
                                {turma.nome_turma}
                            </option>
                        ))
                    )}
                </select>
                {errors?.id_turma?.type === "validate" && (<p className="error-message">Selecione uma Turma</p>)}

                <label>Descrição:</label>
                <textarea
                    placeholder='Adicionar descrição da aula'
                    className={errors.descricao ? "inputDescricao input-error" : "inputDescricao"}
                    {...register('descricao', { required: true })}
                    rows="5"
                    cols="50"
                />
                {errors.descricao && <p className="error-message">Descrição é obrigatória</p>}

                <label>Frequência:</label>
                {alunos.length === 0 ? (
                    <p>Selecione uma Turma para ver os alunos.</p>
                ) : (
                    alunos.map(aluno => (
                        <CardAlunoFrequencia
                            key={aluno.id_aluno}
                            id={aluno.id_aluno}
                            nome_aluno={aluno.nome_aluno}
                            presente={aluno.presente}
                            justificativa={aluno.justificativa}
                            onPresenteChange={handlePresenteChange}
                            onJustificativaChange={handleJustificativaChange}
                        />
                    ))
                )}
            </div>
            <div className='divBotoesInputs'>
                <button className='botaoInputs' onClick={() => navigate('/home-educador')}>Voltar</button>
                <button className='botaoInputs' onClick={handleSubmit(onSubmit)}>Salvar Aula</button>
            </div>
        </main>
    );
};

export default TelaCadastrarAula;
