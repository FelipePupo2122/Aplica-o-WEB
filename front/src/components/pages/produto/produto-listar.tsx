import { error } from "console";
import { useEffect } from "react";

function ProdutoListar() {
  useEffect(() => {
    console.log("componente carregado");
    carregarDados();
  }, []);

  function carregarDados() {
    fetch("https://viacep.com.br/ws/80540280/json/")
      .then((resposta) => resposta.json())
      .then((dados) => {
        console.log(dados);
      })
      .catch((error) => {
        console.log("Deu erro pai!");
      });
  }

  return <h1>Listar produtos</h1>;
}

export default ProdutoListar;
