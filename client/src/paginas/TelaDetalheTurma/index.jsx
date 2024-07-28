import React, { useContext, useEffect } from 'react';
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

    useForm();

    const navigate = useNavigate();    
    
    const navegarBotaoVoltar = () =>{

        navigate('/tela-turmas');
    }
    
    const navegarBotaoCadastrarTurma = () =>{

        navigate('/home-educador');
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        
        console.log(data);

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

    const { turma } = location.state;

   

    
  
    return (
        <main className='mainPage'>

            <h1 className='titlePage'>Detalhe Turma</h1>

            <div className='divInputsMain'>


                <label>Nome da Turma:</label>

                <input
                    type='text'
                    defaultValue={turma.nome_turma}
                    placeholder='Nome da turma'
                    className={errors.nome_turma && "input-error"}
                    {...register('nome_turma', { required: true })}      
                />
                {errors.nome_turma && <p className="error-message">Nome da turma é obrigatório</p>}

                <label>Projeto:</label>

                <select

                    className={errors.projeto && "input-error"}
                    defaultValue={turma.projeto}
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
                    defaultValue={turma.turno}
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

                <button className='botaoInputs' onClick={navegarBotaoVoltar}>Voltar</button>

                <button className='botaoInputs' onClick={() => handleSubmit(onSubmit)()}>Salvar</button>


            </div>



        </main>

    );
};

export default TelaDetalheTurma;