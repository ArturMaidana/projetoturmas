import React, { useState } from 'react';

// O componente recebe uma propriedade chamada 'onFilter', que é uma função para aplicar o filtro.
export function TurmaFilter({ onFilter }) {
  // Define um estado para o filtro com dois campos: 'nometurmas' e 'turno'.
  const [filtro, setFiltro] = useState({
    nometurmas: '',
    turno: '',
  });

  // Esta função é chamada sempre que um campo de entrada é alterado.
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Atualiza o estado do filtro com os valores dos campos de entrada.
    setFiltro({ ...filtro, [name]: value });
  };

  // Esta função é chamada quando o botão de filtro é clicado.
  const handleFilterClick = () => {
    // Chama a função 'onFilter' passando o estado atual do filtro como argumento.
    onFilter(filtro);
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-center">
        <div className="me-4">
          <input
            type="text"
            className="form-control form-control-md"
            id="nometurmas"
            name="nometurmas"
            placeholder="Turma"
            value={filtro.nometurmas}
            onChange={handleInputChange}
          />
        </div>
        <div className="me-2">
          <select
            className="form-select form-select-md"
            id="turno"
            name="turno"
            value={filtro.turno}
            onChange={handleInputChange}
          >
            <option value="">Todos</option>
            <option value="Matutino">Matutino</option>
            <option value="Vespertino">Vespertino</option>
            <option value="Noturno">Noturno</option>
          </select>
        </div>
        <button className="btn btn-primary btn-md" onClick={handleFilterClick}>Filtrar</button>
      </div>
    </div>
  );
}
