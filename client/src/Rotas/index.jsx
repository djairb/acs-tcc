import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from "../context/UserContext";

import TelaLogin from "../paginas/TelaLogin";


import TelaHomeEducador from "../paginas/TelaHomeEducador";
import TelaTurmas from "../paginas/TelaTurmas";


import TelaCadastrarTurma from "../paginas/TelaCadastrarTurma";
import TelaEditarTurma from "../paginas/TelaEditarTurma";
import TelaCadastrarAula from "../paginas/TelaCadastrarAula";
import TelaEditarAula from "../paginas/TelaEditarAula";

const Rotas = () => (
  <HashRouter>

    <UserProvider>

      <Routes>       

        <Route exact path='/'   element={<TelaLogin/>}/>
        <Route exact path='/home-educador'   element={<TelaHomeEducador/>}/>
        <Route exact path='/login'   element={<TelaLogin/>}/>
        <Route exact path='/tela-turmas'   element={<TelaTurmas/>}/>
        <Route exact path='/tela-editar-turma'   element={<TelaEditarTurma/>}/>
        <Route exact path='/tela-cadastrar-turma'   element={<TelaCadastrarTurma/>}/> 
        <Route exact path='/tela-cadastrar-aula'   element={<TelaCadastrarAula/>}/>  

        <Route exact path='/tela-editar-aula'   element={<TelaEditarAula/>}/>



        
        
      </Routes>
      
    </UserProvider>
   
  </HashRouter>
);

export default Rotas;