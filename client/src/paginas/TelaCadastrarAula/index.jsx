import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import { useForm } from 'react-hook-form';

import Axios from "axios";
import DialogInserirAlunoArray from '../../componentes/dialogInserirAlunoArray/DialogInserirAlunoArray';
import CardAluno from '../../componentes/CardAluno/CardAluno';

const TelaCadastrarAula = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const [turmas, setTurmas] = useState([]);

    useEffect(() => {

        if (user.id === null) {
            navigate('/login')
        }

    }, [user]);

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





    const { register, handleSubmit, formState: { errors, setError } } = useForm();

    const [listaAlunos, setListaAlunos] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);





    const onSubmit = async (data) => {

        if (listaAlunos.length === 0) {
            alert("Sem alunos cadastrados")
            return; //retornar depois de verificar que a lista local ta vazia
        }


        try {
            await Axios.post("http://localhost:3001/inserirTurma", {
                nome_turma: data.nome_turma,
                projeto: data.projeto,
                turno: data.turno,
                id_educador: user.id_educador,
                listaAlunos: listaAlunos
            });

            navigate('/tela-turmas')


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
                    rows="5"  // Ajuste o número de linhas conforme necessário
                    cols="50"  // Ajuste a largura conforme necessário
                />
                {errors.descricao && <p className="error-message">Descrição é obrigatória</p>}















                <label>Turno:</label>

                <select


                    className={errors.turno && "input-error"}
                    defaultValue="0"
                    {...register("turno", { validate: (value) => value !== "0" })}
                >
                    <option value="0">Selecionar Turno</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>

                </select>
                {errors?.turno?.type === "validate" && (<p className="error-message">Selecione um Turno</p>)}

                <label>Alunos</label>



            </div>

            <div className='divBotoesInputs'>

                <button className='botaoInputs' >Voltar</button>

                {/* <button className='botaoInputs' onClick={inserirAluno}>Salvar Aula</button> */}


            </div>



        </main>

    );
};

export default TelaCadastrarAula;