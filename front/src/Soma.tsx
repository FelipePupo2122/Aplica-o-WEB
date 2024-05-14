import { useState } from "react";

function Soma() {
  const [contador, setContador] = useState(0);

  function clicar() {
    setContador(contador + 1);
    console.log(contador);
  }

  return (
    <div>
      <label>Numero 1:</label>
      <input type="text" />
      <label>Numero 2:</label>
      <input type="text" />
      <button onClick={clicar}>Somar</button>
    </div>
  );
}

export default Soma;
