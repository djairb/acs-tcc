import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';

import TelaLogin from "../paginas/TelaLogin";
import TelaCrud from "../paginas/TelaCRUD";

const Rotas = () => (
  <HashRouter>
    <Routes>
      <Route exact path='/'   element={<TelaLogin/>}/>
      <Route exact path='/pagina-crud'   element={<TelaCrud/>}/>
    </Routes>
  </HashRouter>
);

export default Rotas;