import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProdutoListar from "./components/pages/produto/produto-listar";
import ProdutoCadastrar from "./components/pages/produto/produto-cadastrar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProdutoListar />} />
        <Route path="/cadastrar" element={<ProdutoCadastrar />} />
      </Routes>
    </Router>
  );
}

export default App;
