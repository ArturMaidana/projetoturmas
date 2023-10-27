// Importa o módulo 'api' de outro arquivo chamado 'api'
import { api } from "./api";

// Função assíncrona para buscar turmas com base em filtros
export async function getTurma(filters) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação GET para a rota '/turmas' da API, passando o token de autorização e os filtros como parâmetros
    const result = await api.get('/turmas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        },
        params: filters
    });

    // Retorna o resultado da solicitação
    return result;
}

// Função assíncrona para excluir uma turma com base no ID
export async function deleteTurmas(id) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação DELETE para a rota '/turmas/{id}' da API, passando o token de autorização
    const result = await api.delete(`/turmas/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}

// Função assíncrona para atualizar informações de uma turma
export async function updateTurmas(data) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação PUT para a rota '/turmas/{id}' da API, passando dados da turma e o token de autorização
    const result = await api.put(`/turmas/${data.id}`, {
        nometurmas: data.nometurmas,
        ensino: data.ensino,
        turno: data.turno,
        cargaHoraria: data.cargaHoraria,
        data_inicio: data.data_inicio,
        data_final: data.data_final
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}

// Função assíncrona para criar uma nova turma
export async function createTurmas(data) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação POST para a rota '/turma' da API, passando dados da turma e o token de autorização
    const result = await api.post('/turma', {
        nometurmas: data.nometurmas,
        ensino: data.ensino,
        turno: data.turno,
        cargaHoraria: data.cargaHoraria,
        data_inicio: data.data_inicio,
        data_final: data.data_final
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}
