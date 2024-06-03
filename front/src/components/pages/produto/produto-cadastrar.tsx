import { useState } from "react";
import { Produto } from "../../../Models/Produto";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from "@chakra-ui/react";

function ProdutoCadastrar() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(0);

  async function cadastrarProduto() {
    const produto: Produto = {
      nome,
      descricao,
      preco,
      quantidade,
    };

    await fetch("http://localhost:5292/api/produto/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    })
      .then((resposta) => resposta.json())
      .then((produtoCadastrado: Produto) => {
        console.log(produtoCadastrado);
      });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Cadastrar Produto
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarProduto();
        }}
      >
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="descricao" mb={4}>
          <FormLabel>Descrição</FormLabel>
          <Input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="preco" mb={4}>
          <FormLabel>Preço</FormLabel>
          <Input
            type="number"
            value={preco}
            onChange={(e) => setPreco(parseFloat(e.target.value))}
            required
          />
        </FormControl>
        <FormControl id="quantidade" mb={4}>
          <FormLabel>Quantidade</FormLabel>
          <Input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value, 10))}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Cadastrar
        </Button>
      </form>
      <Link to="/">
        <Button mt={4} colorScheme="teal">
          Voltar para Listagem
        </Button>
      </Link>
    </Box>
  );
}

export default ProdutoCadastrar;
