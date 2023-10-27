import React, { useState } from 'react';

export function AlunosFilter({ onFilter }) {
  // Define um estado para os filtros de nome de alunos e turno
  const [filtro, setFiltro] = useState({
    nomealunos: '',
    turno: '',
  });

  // Função para lidar com as mudanças nos campos de filtro
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Atualiza o estado do filtro com o novo valor
    setFiltro({ ...filtro, [name]: value });
  };

  // Função para acionar o filtro quando o botão "Filtrar" é clicado
  const handleFilterClick = () => {
    // Chama a função 'onFilter' passando o objeto 'filtro' como argumento
    onFilter(filtro);
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-center">
        <div className="me-4">
          <input
            type="text"
            className="form-control form-control-md" 
            id="nomealunos"
            name="nomealunos"
            placeholder="Buscar..."
            value={filtro.nomealunos}
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
        <button className="btn btn-primary btn-md" onClick={handleFilterClick}>Filtrar</button> {/* Alterado para btn-md */}
      </div>
    </div>
  );
}
