import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from "../context/UserContext";

import TelaLogin from "../paginas/TelaLogin";


import TelaHomeEducador from "../paginas/TelaHomeEducador";
import TelaTurmas from "../paginas/TelaTurmas";


import TelaCadastrarTurma from "../paginas/TelaCadastrarTurma";
import TelaEditarTurma from "../paginas/TelaEditarTurma";

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
        
      </Routes>
      
    </UserProvider>
   
  </HashRouter>
);

export default Rotas;