import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TelaPrincipal from "../paginas/TelaPrincipal";
import TelaCrud from "../paginas/TelaCRUD";

const Rotas = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/'   element={<TelaPrincipal/>}/>
      <Route exact path='/pagina-crud'   element={<TelaCrud/>}/>
    </Routes>
  </BrowserRouter>
);

export default Rotas;