import './style.css'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import Axios from "axios";
import Card from '../../componentes/cards/card';






function TelaCrud() {

    const location = useLocation();

  // Obtém o dado do state
    const dado = location.state;

    const [values, setValues] = useState();
    console.log(values);
    const [listGames, setListGames] = useState();

    

    const handleChangeValues = value => (

      setValues(prevValue => ({
        ...prevValue,
        [value.target.name]: value.target.value,

      }))

    );


    /// ctrl + ; comenta e descomenta

    const handleClickButton = () => {
      //http://localhost:3001/register
      //https://somosconexaosocial.org/appcrud/register
      Axios.post("http://localhost:3001/register", {
        nome: values.nome,
        preco: values.preco,
        categoria: values.categoria,
      }).then((response) => {
        console.log(response)
        
      })
      document.location.reload()
    };

    useEffect(() => {
      ///http://localhost:3001/getCards
      //https://somosconexaosocial.org/appcrud/getCards
      Axios.get("http://localhost:3001/getCards").then((response) => {
        setListGames(response.data)
      });
      

    }, []);

    return (
      <div className='app-container'>
        <div className='register--container'>

        
          <h1>Bem vindo usuario {dado.usuario}</h1>
          

          <input
            type='text'
            name='nome'
            placeholder='Nome'
            className='register--input'
            onChange={handleChangeValues}
          />

          <input
            type='text'
            name='preco'
            placeholder='Preço'
            className='register--input'
            onChange={handleChangeValues}
          />

          <input
            type='text'
            name='categoria'
            placeholder='Categoria'
            className='register--input'
            onChange={handleChangeValues}
          />

          <button

            onClick={() => handleClickButton()}


          >
            Cadastrar
          </button>




        </div>
        
        {typeof listGames !== "undefined" &&
          
          listGames.map((value) => {
            return (

              <Card
              
                key={value.id}
                listCard={listGames}
                setListCard={setListGames}
                id={value.id}
                nome={value.nome}
                preco={value.preco}
                categoria={value.categoria}

              ></Card>
              
            )
            //ta retornando 4 por causa do arraymap que faz tipo um for
          })}



      </div>
    );

  
  
}

export default TelaCrud;












