import '../../style/style.css'
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Axios from "axios";

function TelaLogin() {
  
  // useEffect é utilizado com a dependência [logado]. Isso significa que o bloco de código dentro do useEffect será executado sempre que o valor de logado for alterado. Isso permite que você realize ações adicionais sempre que o estado logado for modificado.

  // };  
  const {user,toggleUser} = useContext(UserContext);
  const [loginError, setLoginError] = useState();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {  

    try {
      const response = await Axios.post("http://localhost:3001/getUserLogin", {
        usuario: data.usuario,
        senha: data.senha,
        tipoUsuario: data.tipoUsuario
      });
      
      if ((response.data.length)>0) {
        toggleUser(response.data[0]);
        setLoginError(false);
        console.log(user);
        {data.tipoUsuario==="educador" ? navigate('/home-educador') : alert("Tela Coord ainda não existe")}
        
       
        
        // data ta sendo lido depois que response retorna positivo. então data existe no banco.
        // navigate('/pagina-crud', { state: response.data.usuario }); // Exemplo de passagem de dados para a próxima página
      } else {
        // Login falhou, exibir mensagem de erro
        setLoginError(true); // Ativa o estado de erro
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
    }
  };
  

  return (

    <main className='mainLogin'>

      <form className='formLogin' onSubmit={handleSubmit(onSubmit)}>

        <h2>Login</h2>

        <div className='profissaoDiv'>

          <div className="opdiv">

            <input
              type="radio"
              id="radio-educador"
              value="educador"
              {...register('tipoUsuario', { required: true })}
              
            />
            <label htmlFor="radio-educador">Educador</label>

          </div>

          <div className="opdiv">

            <input
              type="radio"
              id="radio-coordenador"
              value="coordenador"
              {...register('tipoUsuario', { required: true })}
              
            />
            <label htmlFor="radio-coordenador">Coordenador</label>

          </div>


        </div>

        {errors.tipoUsuario && <p className="error-message">Selecione uma opção (Coordenador/Educador)</p>}

        <label>Usuário</label>

        <input
          type='text'
          placeholder='Inserir usuário'
          className={errors.tipoUsuario && "input-error"}
          {...register('usuario', {
            required: true,
            pattern: /^[a-zA-Z0-9]+$/,
          })}      
        />
        {errors.usuario && errors.usuario.type === 'required' && (<p className="error-message">Usuário é obrigatório.</p>)}
        {errors.usuario && errors.usuario.type === 'pattern' && (<p className="error-message">Usuário deve conter apenas letras e números</p>
        )}

        <label>Senha</label>

        <input
          type='password'
          placeholder='Inserir senha'
          className={errors.senha && "input-error"}
          {...register('senha', { required: true })}      
        />
        {errors.senha && <p className="error-message">Senha é obrigatória</p>}

        <button type="submit">Logar</button>

        {loginError && <p className="error-message">Usuário não encontrado</p>}



      </form>

    </main>   

  );
}

export default TelaLogin;












