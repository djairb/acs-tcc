import '../../style/style.css'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

function TelaLogin() {
  
  // useEffect é utilizado com a dependência [logado]. Isso significa que o bloco de código dentro do useEffect será executado sempre que o valor de logado for alterado. Isso permite que você realize ações adicionais sempre que o estado logado for modificado.

  // };  

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

      if (response.data.success) {
        alert("Logado com sucesso!"); // Exemplo de ação após login bem-sucedido
        setLoginError(false); // Resetar estado de erro, se necessário
        // navigate('/dashboard'); // Exemplo de navegação para outra página após login
      } else {
        setLoginError(true); // Ativar estado de erro para exibir mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setLoginError(true);
    }
  };
  

  // const handleClickButton = async () => {
  //   const response = await Axios.get("http://localhost:3001/getUser", { params: { usuario: values.usuario, senha: values.senha } });
  //   let numero = response.data.length;
    
  //   //os valores sao alterados aqui. mas sem o useEffect voce nao pode usar fora da funcao. mas o useeffect roda um conjunto de funcoes de acordo com as modificações, feitas internas ou nao - como é que tá? Jesus é bom.
  //   { (numero > 0) ? setLogado(true) : setLogado(false) }

  //   if(numero > 0){
  //     //setei dadoPadrao e coloquei ele como dependencia no effect. ele não modifica a menos que coloque como dependencia no effect e assim faça de fato o valor ser setado.
  //     setDadoPadrao(response.data[0])
  //   }
    
  // };

  // const navegarPagina = () =>{

  //   navigate('/pagina-crud', { state: dadoPadrao });

  // }

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












