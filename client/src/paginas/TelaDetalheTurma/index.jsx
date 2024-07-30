import React, { useContext, useEffect, useState } from 'react';
import '../../style/style.css';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import { useForm } from 'react-hook-form';

import Axios from "axios";

const TelaDetalheTurma = () => {

    const {user} = useContext(UserContext);

    useEffect(() => {

        if(user.id===null){
            navigate('/login')
        }
        
      }, [user]);

    const navigate = useNavigate();    
    
    const navegarBotaoVoltar = () =>{

        navigate('/tela-turmas');
    }
    
    const navegarBotaoCadastrarTurma = () =>{

        navigate('/home-educador');
    }

    const { register, handleSubmit, formState: { errors, setError }} = useForm();

    const [listaAlunos, setListaAlunos] = useState([]);

    const onSubmit = async (data) => {

        if (listaAlunos.length === 0) {
            alert("Sem alunos cadastrados")
            return;
        }

        alert("eita")

        
        

        

        // try {
        //   const response = await Axios.post("http://localhost:3001/getUserLogin", {
        //     usuario: data.usuario,
        //     senha: data.senha,
        //     tipoUsuario: data.tipoUsuario
        //   });
          
        //   if ((response.data.length)>0) {
        //     toggleUser(response.data[0]);
        //     setLoginError(false);
        //     console.log(user);
        //     {data.tipoUsuario==="educador" ? navigate('/home-educador') : alert("Tela Coord ainda não existe")}
            
           
            
        //     // data ta sendo lido depois que response retorna positivo. então data existe no banco.
        //     // navigate('/pagina-crud', { state: response.data.usuario }); // Exemplo de passagem de dados para a próxima página
        //   } else {
        //     // Login falhou, exibir mensagem de erro
        //     setLoginError(true); // Ativa o estado de erro
        //   }
        // } catch (error) {
        //   console.error('Erro ao tentar fazer login:', error);
        //   alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
        // }
    };

    const location = useLocation();

    //turma que vem da lista, com todos os campos do banco. pra preencher os dados e editar ou deletar pelos botoes

    const [objetoTurma, setObjetoTurma] = useState(location.state);

    const [turmaBanco, setTurmaBanco] = useState(false); 
    //objeto são true, estando falsos ou não

    


    useEffect(() => {
        // Código que deve ser executado quando `count` mudar
        const carregarTurma = async () => {

            if(objetoTurma !== undefined && objetoTurma.isCadastrada){
                try {
                
                    const response = await Axios.get('http://localhost:3001/getTurmaById', {
                        params: {
                            id_educador: user.id_educador,
                            id_turma: objetoTurma.id_turma
                        }
                    });
    
                    {response.data.length === 0 && setTurmaBanco(response.data)}
                    
                  
            
                } catch (error) {
                  console.error('Erro ao tentar fazer login:', error);
                  alert("Ocorreu um erro. Por favor, tente novamente mais tarde.");
                }
            }else{

                setObjetoTurma({

                    isCadastrada: false, 
                    id_turma: null

                    //setei ela como padrão.
                    
            
            
                });

            }
            

            
        };

        carregarTurma();
        //
        
      }, []);

    

   

    
  
    return (
        <main className='mainPage'>

            <h1 className='titlePage'>Detalhe Turma</h1>

            <div className='divInputsMain'>


                <label>Nome da Turma:</label>

                <input
                    type='text'
                    defaultValue={objetoTurma.isCadastrada ? turmaBanco.nome_turma : ""}
                    placeholder='Nome da turma'
                    className={errors.nome_turma && "input-error"}
                    {...register('nome_turma', { required: true })}      
                />
                {errors.nome_turma && <p className="error-message">Nome da turma é obrigatório</p>}

                <label>Projeto:</label>

                <select

                    className={errors.projeto && "input-error"}
                    defaultValue={objetoTurma.isCadastrada ? turmaBanco.projeto : "0"}
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
                    defaultValue={objetoTurma.isCadastrada ? turmaBanco.turno : "0"}
                    {...register("turno", { validate: (value) => value !== "0" })}
                >
                    <option value="0">Selecionar Turno</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                    
                </select>
                {errors?.turno?.type === "validate" && (<p className="error-message">Selecione um Turno</p>)}

                <label>Alunos</label>

                {listaAlunos.length === 0 && <p>sem alunos cadastrados</p>}



            </div>

            

                 

            

            <div className='divBotoesInputs'>

                <button className='botaoInputs' onClick={navegarBotaoVoltar}>Voltar</button>

                <button className='botaoInputs' onClick={() => handleSubmit(onSubmit)()}>Salvar</button>


            </div>



        </main>

    );
};

export default TelaDetalheTurma;