import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TelaLogin from "../paginas/TelaLogin";
import TelaCrud from "../paginas/TelaCRUD";

const Rotas = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/'   element={<TelaLogin/>}/>
      <Route exact path='/pagina-crud'   element={<TelaCrud/>}/>
    </Routes>
  </BrowserRouter>
);

export default Rotas;