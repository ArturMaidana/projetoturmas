import React, { useState } from 'react';

// O componente recebe uma propriedade chamada 'onFilter', que é uma função para aplicar o filtro.
export function DisciplinaFilter({ onFilter }) {
  // Define um estado para o filtro com dois campos: 'nomedisciplina' e 'professor'.
  const [filtro, setFiltro] = useState({
    nomedisciplina: '',
    professor: '',
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
            id="nomedisciplina"
            name="nomedisciplina"
            placeholder="Turma"
            value={filtro.nomedisciplina}
            onChange={handleInputChange}
          />
        </div>
        <div className="me-4">
          <input
            type="text"
            className="form-control form-control-md"
            id="professor"
            name="professor"
            placeholder="Turma"
            value={filtro.professor}
            onChange={handleInputChange}
          />
        </div>
        
          
        <button className="btn btn-primary btn-md" onClick={handleFilterClick}>Filtrar</button>
      </div>
    </div>
  );
}
