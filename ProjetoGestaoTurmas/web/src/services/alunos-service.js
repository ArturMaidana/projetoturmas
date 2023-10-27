// Importa o módulo 'api' de outro arquivo chamado 'api'
import { api } from "./api";

// Função assíncrona para buscar alunos com base em filtros
export async function getAlunos(filters) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação GET para a rota '/alunos' da API, passando o token de autorização e os filtros como parâmetros
    const result = await api.get('/alunos', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        },
        params: filters
    });

    // Retorna o resultado da solicitação
    return result;
}

// Função assíncrona para buscar turmas
export async function getTurmas() {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação GET para a rota '/turmas' da API, passando o token de autorização
    const result = await api.get('/turmas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}

// Função assíncrona para excluir um aluno com base no ID
export async function deleteAlunos(id) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação DELETE para a rota '/alunos/{id}' da API, passando o token de autorização
    const result = await api.delete(`/alunos/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}

// Função assíncrona para atualizar informações de um aluno
export async function updateAlunos(data) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação PUT para a rota '/alunos/{id}' da API, passando dados de aluno e o token de autorização
    const result = await api.put(`/alunos/${data.id}`, {
        nomealunos: data.nomealunos, 
        turma: data.turma, 
        turno: data.turno, 
        telefone: data.telefone, 
        dataIngressante: data.dataIngressante,
        notas: data.notas,
        disciplinas: data.disciplinas
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}

// Função assíncrona para criar um novo aluno
export async function createAlunos(data) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação POST para a rota '/aluno' da API, passando dados de aluno e o token de autorização
    const result = await api.post('/aluno', {
        nomealunos: data.nomealunos, 
        turma: data.turma, 
        turno: data.turno, 
        telefone: data.telefone, 
        dataIngressante: data.dataIngressante,
        notas: data.notas,
        disciplinas: data.disciplinas
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}
