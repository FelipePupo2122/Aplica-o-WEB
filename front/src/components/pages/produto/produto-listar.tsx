import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from "@chakra-ui/react";
import { Produto } from "../../../Models/Produto";

function ProdutoListar() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchProdutos() {
      const response = await fetch('http://localhost:5292/api/produto/listar');
      const data = await response.json();
      setProdutos(data);
    }

    fetchProdutos();
  }, []);

  function agruparProdutosPorData() {
    // Agrupando os produtos por data
    const agrupados: { [key: string]: Produto[] } = {};
  
    produtos.forEach((produto) => {
      const dataCriacaoString = produto.criadoEm;
      if (!dataCriacaoString) return; // Verifica se criadoEm é undefined
  
      const dataCriacao = new Date(dataCriacaoString);
      const dataAtual = new Date();
      const diferencaDias = Math.floor((dataAtual.getTime() - dataCriacao.getTime()) / (1000 * 3600 * 24));
      let categoria;
  
      if (diferencaDias === 0) {
        categoria = 'Hoje';
      } else if (diferencaDias === 1) {
        categoria = 'Ontem';
      } else if (diferencaDias <= 7) {
        categoria = 'Esta semana';
      } else if (dataAtual.getMonth() === dataCriacao.getMonth()) {
        categoria = 'Este mês';
      } else {
        categoria = 'Outros';
      }
  
      if (!agrupados[categoria]) {
        agrupados[categoria] = [];
      }
  
      agrupados[categoria].push(produto);
    });
  
    return agrupados;
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Listar produtos</Heading>
      {Object.entries(agruparProdutosPorData()).map(([categoria, produtos]) => (
        <Box key={categoria} mb={6}>
          <Heading as="h2" size="lg" mb={3}>{categoria}</Heading>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nome</Th>
                <Th>Descrição</Th>
                <Th>Preço</Th>
                <Th>Quantidade</Th>
                <Th>Criado em</Th>
              </Tr>
            </Thead>
            <Tbody>
              {produtos.map((produto) => (
                <Tr key={produto.id}>
                  <Td>{produto.id}</Td>
                  <Td>{produto.nome}</Td>
                  <Td>{produto.descricao}</Td>
                  <Td>R$ {produto.preco}</Td>
                  <Td>{produto.quantidade}</Td>
                  <Td>{produto.criadoEm}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ))}
      <Link to="/cadastrar">
        <Button mt={4} colorScheme="teal">Cadastrar Novo Produto</Button>
      </Link>
    </Box>
  );
}

export default ProdutoListar;
