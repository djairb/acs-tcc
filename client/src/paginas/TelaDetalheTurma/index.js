import React, { useContext, useEffect } from 'react';
import '../../style/style.css';
import { useNavigate } from 'react-router-dom';

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

    
  
    return (
        <main className='mainPage'>

            <h1 className='titlePage'>Detalhe Turma</h1>

            <div className='divInputsMain'>


                <label>Usuário</label>

                <input
                    type='text'
                    placeholder='Inserir senha'
                    className={errors.senha && "input-error"}
                    {...register('senha', { required: true })}      
                />
                {errors.senha && <p className="error-message">Senha é obrigatória</p>}






            </div>

            

                 

            

            <div className='divBotoesInputs'>

                <button className='botaoInputs' onClick={navegarBotaoVoltar}>Voltar</button>

                <button className='botaoInputs' onClick={navegarBotaoCadastrarTurma}>Salvar</button>


            </div>



        </main>

    );
};

export default TelaDetalheTurma;