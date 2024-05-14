function Soma() {
  function clicar() {
    alert("Cliquei");
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
