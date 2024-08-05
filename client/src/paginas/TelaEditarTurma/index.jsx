import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import { useForm } from 'react-hook-form';

import Axios from "axios";


import CardEditarAluno from '../../componentes/CardEditarAluno/CardEditarAluno';
import DialogEditarAlunoBanco from '../../componentes/dialogEditarAlunoBanco/DialogEditarAlunoBanco';
import DialogInserirAlunoBanco from '../../componentes/dialogInserirAlunoBanco/dialogInserirAlunoBanco';

const TelaEditarTurma = () => {

    const { user } = useContext(UserContext);

    useEffect(() => {

        if (user.id === null) {
            navigate('/login')
        }

    }, [user]);

    const location = useLocation();

    const objetoTurma = location.state;
    
    console.log(objetoTurma)

    const [count, setCount] = useState(0);

    const [listaAlunos, setListaAlunos] = useState([]);

    useEffect(() => {
        // Código que deve ser executado quando `count` mudar

        // nao use useEffect pra renderizar componente.
        //usa ele aqui pra atualizar a lista que recebe a requisição - quando um componente é adicionado
        const carregarAlunos = async () => {
            
            

            try {
                
                const response = await Axios.get('http://localhost:3001/getAllAlunosByIdTurma', {
                    params: {
                        id: objetoTurma.id_turma
                    }
                });
                setListaAlunos(response.data);
              
        
            } catch (error) {
              console.error('Erro ao tentar fazer login:', error);
              alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
              
            }
        };

        carregarAlunos();
        //
        
    }, [count]);


    const navigate = useNavigate();

    const navegarBotaoVoltar = () => {

        navigate('/tela-turmas');
    }

    const inserirAluno = () => {

        setOpenDialog(true);
    }

    const navegarBotaoCadastrarTurma = () => {

        navigate('/home-educador');
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    

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

    

    //turma que vem da lista, com todos os campos do banco. pra preencher os dados e editar ou deletar pelos botoes  

    return (
        <main className='mainPage'>

            <DialogInserirAlunoBanco

                open={openDialog}

                setOpenDialog={setOpenDialog}

                turma_id={objetoTurma.id_turma}

                setCount={setCount}
                
                count={count}

                id_turma={objetoTurma.id_turma}

            />

            <h1 className='titlePage'>Editar Turma</h1>

            <div className='divInputsMain'>


                <label>Nome da Turma:</label>

                <input
                    type='text'
                    placeholder='Nome da turma'
                    defaultValue={objetoTurma.nome_turma}
                    className={errors.nome_turma && "input-error"}
                    {...register('nome_turma', { required: true })}
                />
                {errors.nome_turma && <p className="error-message">Nome da turma é obrigatório</p>}

                <label>Projeto:</label>

                <select

                    className={errors.projeto && "input-error"}
                    defaultValue={objetoTurma.projeto}
                    {...register("projeto", { validate: (value) => value !== "0" })}
                >
                    <option value="0">Selecionar Projeto</option>
                    <option value="Conecta Vidas">Conecta Vidas</option>
                    <option value="Passaporte Digital">Passaporte Digital</option>
                    <option value="Centro Formação">Centro de Formação</option>
                    <option value="Oportunizar Urbano">Oportunizar Urbano</option>
                    <option value="Oportunizar Rural">Oportunizar Rural</option>
                    <option value="VamoSimbora?">VamoSimbora</option>
                </select>
                {errors?.projeto?.type === "validate" && (<p className="error-message">Selecione um Projeto</p>)}

                <label>Turno:</label>

                <select


                    className={errors.turno && "input-error"}
                    defaultValue={objetoTurma.turno}
                    {...register("turno", { validate: (value) => value !== "0" })}
                >
                    <option value="0">Selecionar Turno</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>

                </select>
                {errors?.turno?.type === "validate" && (<p className="error-message">Selecione um Turno</p>)}

                <label>Alunos</label>

                {listaAlunos.length === 0 ? <p>Ainda sem alunos</p> :

                    listaAlunos.map(aluno => (                        

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
                }

            </div>

            <div className='divBotoesInputs'>

                <button className='botaoInputs' onClick={navegarBotaoVoltar}>Voltar</button>

                <button className='botaoInputs' onClick={inserirAluno}>Inserir Aluno</button>

                <button className='botaoInputs' onClick={() => handleSubmit(onSubmit)()}>Salvar Edições</button>


            </div>



        </main>

    );
};

export default TelaEditarTurma;