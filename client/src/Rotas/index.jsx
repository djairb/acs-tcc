import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from "../context/UserContext";

import TelaLogin from "../paginas/TelaLogin";


import TelaHomeEducador from "../paginas/TelaHomeEducador";
import TelaTurmas from "../paginas/TelaTurmas";

import TelaDetalheTurma from "../paginas/TelaDetalheTurma";

const Rotas = () => (
  <HashRouter>

    <UserProvider>

      <Routes>       

        <Route exact path='/'   element={<TelaLogin/>}/>
        <Route exact path='/home-educador'   element={<TelaHomeEducador/>}/>
        <Route exact path='/login'   element={<TelaLogin/>}/>
        <Route exact path='/tela-turmas'   element={<TelaTurmas/>}/>
        <Route exact path='/tela-detalhe-turma'   element={<TelaDetalheTurma/>}/>        
        
      </Routes>
      
    </UserProvider>
   
  </HashRouter>
);

export default Rotas;