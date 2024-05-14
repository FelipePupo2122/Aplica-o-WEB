import React, { useState } from "react";

function Calculadora() {
  const [valor1, setValor1] = useState("");
  const [valor2, setValor2] = useState("");
  const [resultado, setResultado] = useState("");

  const calcular = () => {
    const num1 = parseFloat(valor1);
    const num2 = parseFloat(valor2);
    const soma = num1 + num2;
    setResultado(soma.toString());
  };

  return (
    <div className="Calculadora">
      <input
        type="text"
        value={valor1}
        onChange={(e) => setValor1(e.target.value)}
        placeholder="Digite o primeiro valor"
      />
      <input
        type="text"
        value={valor2}
        onChange={(e) => setValor2(e.target.value)}
        placeholder="Digite o segundo valor"
      />
      <button onClick={calcular}>Calcular</button>
      <div>Resultado: {resultado}</div>
    </div>
  );
}

export default Calculadora;
