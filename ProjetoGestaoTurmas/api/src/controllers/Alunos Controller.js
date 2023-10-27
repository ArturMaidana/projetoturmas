const { HttpHelper } = require('../utils/http-helper');
const { AlunosModel } = require('../models/alunos-model');
const { Validates } = require('../utils/validates');

class AlunosController {
    // Método para criar um novo aluno
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nomealunos, turma, turno, telefone, dataIngressante } = request.body;
            
            // Verifica se o nome do aluno está presente no corpo da solicitação
            if (!nomealunos) return httpHelper.badRequest('Parâmetros inválidos!');
            
            // Valida o turno usando a função 'validTurn' do módulo 'Validates'
            if (turno) {
                const validTurn = Validates.validTurn(turno);
                if (!validTurn) return httpHelper.badRequest('Turno inválido!');
            }
            
            // Cria um novo aluno no banco de dados usando o modelo 'AlunosModel'
            const alunos = await AlunosModel.create({
                nomealunos, turma, turno, telefone, dataIngressante
            });
            
            return httpHelper.created(alunos);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para obter todos os alunos com base em filtros
    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nomealunos, turno, turma } = request.query;

            const filter = {}
            if (nomealunos){
                filter.nomealunos = nomealunos;
            }
            if (turno) {
                filter.turno = turno;
            }
            if (turma) {
                filter.turma = turma;
            }

            // Busca todos os alunos no banco de dados com base nos filtros
            const alunos = await AlunosModel.findAll({
                where: filter
            });
            
            return httpHelper.ok(alunos);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para excluir um aluno
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            // Verifica se o aluno existe no banco de dados
            const alunosExists = await AlunosModel.findOne({ where: { id } });

            if (!alunosExists) return httpHelper.notFound('Aluno não encontrado!');
            
            // Exclui o aluno do banco de dados
            await AlunosModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'Aluno deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para atualizar os dados de um aluno
    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;

            const { nomealunos, turma, turno, telefone, dataIngressante } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            
            // Valida o turno usando a função 'validTurn' do módulo 'Validates'
            if (turno) {
                const validTurn = Validates.validTurn(turno);
                if (!validTurn) return httpHelper.badRequest('Turno inválido!');
            }
            
            // Verifica se o aluno existe no banco de dados
            const alunosExists = await AlunosModel.findByPk(id);
            
            if (!alunosExists) return httpHelper.notFound('Aluno não encontrado!');
            
            // Atualiza os dados do aluno no banco de dados
            await AlunosModel.update({
                nomealunos, turma, turno, telefone, dataIngressante
            }, {
                where: { id }
            });
            
            return httpHelper.ok({
                message: 'Aluno atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { AlunosController };
