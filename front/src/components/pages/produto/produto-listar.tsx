import { useEffect, useState } from 'react';
import { Produto } from "../../../Models/Produto";

function ListarProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchProdutos() {
      const response = await fetch('http://localhost:5292/api/produto/listar');
      const data = await response.json();
      setProdutos(data);
    }

    fetchProdutos();
  }, []);

  async function cadastrarProduto() {
    const produto: Produto = {
      nome: 'Dedo teste',
      descricao: 'teste dedo',
      preco: 157,
      quantidade: 10
    };
    await fetch('http://localhost:5292/api/produto/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    })
   .then((resposta) => resposta.json())
   .then((produtoCadastrado: Produto) => {
        console.log(produtoCadastrado);
      });
  }

  return (
    <div>
      <h1>Listar produtos</h1>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }}>ID</th>
            <th style={{ border: '1px solid black' }}>Nome</th>
            <th style={{ border: '1px solid black' }}>Descrição</th>
            <th style={{ border: '1px solid black' }}>Preço</th>
            <th style={{ border: '1px solid black' }}>Quantidade</th>
            <th style={{ border: '1px solid black' }}>Criado em</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td style={{ border: '1px solid black' }}>{produto.id}</td>
              <td style={{ border: '1px solid black' }}>{produto.nome}</td>
              <td style={{ border: '1px solid black' }}>{produto.descricao}</td>
              <td style={{ border: '1px solid black' }}>R$ {produto.preco}</td>
              <td style={{ border: '1px solid black' }}>{produto.quantidade}</td>
              <td style={{ border: '1px solid black' }}>{produto.criadoEm}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={cadastrarProduto}>Cadastrar</button>
    </div>
  );
}

export default ListarProdutos;