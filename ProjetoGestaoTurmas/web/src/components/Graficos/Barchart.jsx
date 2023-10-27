import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { getTurma } from '../../services/turmas-service'; // Importe a função getTurma
import { getAlunos, getTurmas } from '../../services/alunos-service'; // Importe a função getAlunos

export function Graficos() {
  const [turmas, setTurmas] = useState([]); // Estado para armazenar os dados das turmas
  const [quantidadeAlunos, setQuantidadeAlunos] = useState(0); // Estado para armazenar a quantidade de alunos
  const [quantidadeTurmas, setQuantidadeTurmas] = useState(0); // Estado para armazenar a quantidade de turmas

  // Função para buscar os dados das turmas
  async function fetchTurmas() {
    try {
      const response = await getTurma();
      setTurmas(response.data); // Define os dados das turmas no estado
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  }

  // Função para buscar a quantidade de alunos
  async function fetchQuantidadeAlunos() {
    try {
      const response = await getAlunos();
      setQuantidadeAlunos(response.data.length); // Define a quantidade de alunos no estado
    } catch (error) {
      console.error('Erro ao buscar quantidade de alunos:', error);
    }
  }

  async function fetchQuantidadeTurmas() {
    try {
      const response = await getTurmas();
      setQuantidadeTurmas(response.data.length); // Define a quantidade de alunos no estado
    } catch (error) {
      console.error('Erro ao buscar quantidade de alunos:', error);
    }
  }

  // Chamada para buscar os dados das turmas e a quantidade de alunos quando o componente for montado
  useEffect(() => {
    fetchTurmas();
    fetchQuantidadeAlunos();
    fetchQuantidadeTurmas();
  }, []);

  // Função para calcular a quantidade de turmas por turno
  function calcularQuantidadePorTurno(turno) {
    return turmas.filter((turma) => turma.turno === turno).length;
  }

  function calcularQuantidadePorSemestre(semestre) {
    return turmas.filter((turma) => turma.nometurmas === semestre).length;
  }

  const semestres = turmas.map((turma) => turma.nometurmas);
  const semestresUnicos = [...new Set(semestres)];

  // Dados para o gráfico de quantidade de turmas por turno
  const dataTurmasPorTurno = [
    ['Turnos', 'Quantidade de Turmas'],
    ['Matutino', calcularQuantidadePorTurno('Matutino')],
    ['Vespertino', calcularQuantidadePorTurno('Vespertino')],
    ['Noturno', calcularQuantidadePorTurno('Noturno')],
  ];

  const dataTurmasPorSemestre = [
    ['Semestre', 'Quantidade de Turmas'],
    ...semestresUnicos.map((semestre) => [
      semestre,
      calcularQuantidadePorSemestre(semestre),
    ]),
  ];

  // Opções para o gráfico de quantidade de turmas por turno
  const optionsTurmasPorTurno = {
    title: 'Quantidade de Turmas por Turno',
    is3D: true,
  };

  const optionsTurmasPorSemestre = {
    title: 'Quantidade de Turmas por Semestre',
    is3D: true,
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quantidade de Alunos</h5>
              <p className="card-text">{quantidadeAlunos}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quantidade de Turmas</h5>
              <p className="card-text">{quantidadeTurmas}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <Chart
            chartType="ColumnChart"
            data={dataTurmasPorTurno}
            options={optionsTurmasPorTurno}
            width={'100%'}
            height={'500px'}
          />
        </div>
        <div className="col-md-6">
          <Chart
            chartType="PieChart"
            data={dataTurmasPorSemestre}
            options={optionsTurmasPorSemestre}
            width={'100%'}
            height={'500px'}
          />
        </div>
      </div>
      </div>
  );
}
