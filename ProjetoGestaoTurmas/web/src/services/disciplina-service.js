// Importa o módulo 'api' de outro arquivo chamado 'api'
import { api } from "./api";

// Função assíncrona para buscar Disciplina com base em filtros
export async function getDisciplina(filters) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação GET para a rota '/Disciplina' da API, passando o token de autorização e os filtros como parâmetros
    const result = await api.get('/disciplinas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        },
        params: filters
    });

    // Retorna o resultado da solicitação
    return result;
}


// Função assíncrona para excluir um aluno com base no ID
export async function deleteDisciplina(id) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação DELETE para a rota '/Disciplina/{id}' da API, passando o token de autorização
    const result = await api.delete(`/disciplinas/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}

// Função assíncrona para atualizar informações de um aluno
export async function updateDisciplina(data) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação PUT para a rota '/Disciplina/{id}' da API, passando dados de aluno e o token de autorização
    const result = await api.put(`/disciplinas/${data.id}`, {
        nomedisciplina: data.nomedisciplina, 
        qtde_aulas: data.qtde_aulas, 
        professor: data.professor 
    
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}

// Função assíncrona para criar um novo aluno
export async function createDisciplina(data) {
    // Obtém o token de acesso da sessão do navegador
    const accessToken = sessionStorage.getItem('token');
    
    // Faz uma solicitação POST para a rota '/aluno' da API, passando dados de aluno e o token de autorização
    const result = await api.post('/disciplina', {
        nomedisciplina: data.nomedisciplina, 
        qtde_aulas: data.qtde_aulas, 
        professor: data.professor,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });

    // Retorna o resultado da solicitação
    return result;
}
