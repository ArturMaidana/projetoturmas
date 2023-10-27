const { HttpHelper } = require('../utils/http-helper');
const { TurmasModel } = require('../models/turmas-model');
const { Validates } = require('../utils/validates');

class TurmasController {
    // Método para criar uma nova turma
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nometurmas, ensino, turno, cargaHoraria, data_inicio, data_final } = request.body;

            // Verifica se o nome da turma está presente no corpo da solicitação
            if (!nometurmas) return httpHelper.badRequest('Parâmetros inválidos!');
            
            // Valida o turno usando a função 'validTurn' do módulo 'Validates'
            if (turno) {
                const validTurn = Validates.validTurn(turno);
                if (!validTurn) return httpHelper.badRequest('Turma inválida!');
            }
            
            // Cria uma nova turma no banco de dados usando o modelo 'TurmasModel'
            const turma = await TurmasModel.create({
                nometurmas, ensino, turno, cargaHoraria, data_inicio, data_final
            });
            
            return httpHelper.created(turma);
        
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para listar todas as turmas com base em filtros
    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nometurmas, turno } = request.query;

            const filter = {}
            if (nometurmas){
                filter.nometurmas = nometurmas;
            }
            if (turno) {
                filter.turno = turno;
            }

            // Busca todas as turmas no banco de dados com base nos filtros
            const turmas = await TurmasModel.findAll({
                where: filter
            });
            
            return httpHelper.ok(turmas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para excluir uma turma
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            // Verifica se a turma existe no banco de dados
            const turmaExists = await TurmasModel.findOne({ where: { id } });
            if (!turmaExists) return httpHelper.notFound('Turma não encontrada!');
            
            // Exclui a turma do banco de dados
            await TurmasModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Turma deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para atualizar os dados de uma turma
    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nometurmas, ensino, turno, cargaHoraria, data_inicio, data_final } = request.body;
            if (!nometurmas) return httpHelper.badRequest('Parâmetros inválidos!');
            
            // Valida o turno usando a função 'validTurn' do módulo 'Validates'
            if (ensino) {
                const validTurn = Validates.validTurn(turno);
                if (!validTurn) return httpHelper.badRequest('Turma inválida!');
            }
            
            // Verifica se a turma existe no banco de dados
            const turmaExists = await TurmasModel.findByPk(id);
            if (!turmaExists) return httpHelper.notFound('Turma não encontrada!');
            
            // Atualiza os dados da turma no banco de dados
            await TurmasModel.update({
                nometurmas, ensino, turno, cargaHoraria, data_inicio, data_final
            }, {
                where: { id }
            });
            
            return httpHelper.ok({
                message: 'Turma atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { TurmasController };
