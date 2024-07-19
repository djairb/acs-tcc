import '../../style/style.css'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";



function TelaLogin() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Aqui você pode enviar os dados para o backend ou fazer outra operação
  };

  const [logado, setLogado] = useState();

  const [values, setValues] = useState();

  const [texto, setTexto] = useState("");

  const [dadoPadrao, setDadoPadrao] = useState();

  const navigate = useNavigate();

  // useEffect é utilizado com a dependência [logado]. Isso significa que o bloco de código dentro do useEffect será executado sempre que o valor de logado for alterado. Isso permite que você realize ações adicionais sempre que o estado logado for modificado.

  // };  

  const handleClickButton = async () => {
    const response = await Axios.get("http://localhost:3001/getUser", { params: { usuario: values.usuario, senha: values.senha } });
    let numero = response.data.length;
    
    //os valores sao alterados aqui. mas sem o useEffect voce nao pode usar fora da funcao. mas o useeffect roda um conjunto de funcoes de acordo com as modificações, feitas internas ou nao - como é que tá? Jesus é bom.
    { (numero > 0) ? setLogado(true) : setLogado(false) }

    if(numero > 0){
      //setei dadoPadrao e coloquei ele como dependencia no effect. ele não modifica a menos que coloque como dependencia no effect e assim faça de fato o valor ser setado.
      setDadoPadrao(response.data[0])
    }
    
  };

  const navegarPagina = () =>{

    navigate('/pagina-crud', { state: dadoPadrao });

  }

  return (
    <div className='app-container'>
      <div className='register--container'>

        <h1>Login</h1>

        <input
          type='text'
          name='usuario'
          placeholder='Usuário'
          className='register--input'
          
        />

        <input
          type='text'
          name='senha'
          placeholder='Senha'
          className='register--input'
          
        />

        <button

          onClick={handleClickButton}


        >
          Cadastrar
        </button>

        {logado && <button onClick={navegarPagina}>Proxima Pagina</button>}

        <h1 className={texto.style}>{texto.texto}</h1>

      </div>




    </div>

  );
}

export default TelaLogin;












