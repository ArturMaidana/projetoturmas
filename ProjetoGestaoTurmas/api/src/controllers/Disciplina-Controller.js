const { HttpHelper } = require('../utils/http-helper');
const { DisciplinaModel } = require('../models/disciplina-model');


class DisciplinaController {
    // Método para criar um novo aluno
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nomedisciplina, qtde_aulas, professor } = request.body;
            
            // Verifica se o nome do disciplina está presente no corpo da solicitação
            if (!nomedisciplina) return httpHelper.badRequest('Parâmetros inválidos!');
            
            // Cria um novo disciplina no banco de dados usando o modelo 'DisciplinaModel'
            const disciplina = await DisciplinaModel.create({
                nomedisciplina, qtde_aulas, professor
            });
            
            return httpHelper.created(disciplina);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para obter todos os disciplina com base em filtros
    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nomedisciplina, professor } = request.query;

            const filter = {}
            if (nomedisciplina){
                filter.nomedisciplina = nomedisciplina;
            }
            if (professor) {
                filter.professor = professor;
            }
    
          
            // Busca todos os disciplina no banco de dados com base nos filtros
            const disciplinas = await DisciplinaModel.findAll({
                where: filter
            });
            
            return httpHelper.ok(disciplinas);
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

            // Verifica se o disciplina existe no banco de dados
            const disciplinaExists = await DisciplinaModel.findOne({ where: { id } });

            if (!disciplinaExists) return httpHelper.notFound('disciplina não encontrado!');
            
            // Exclui o disciplina do banco de dados
            await DisciplinaModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'disciplina deletado com sucesso!'
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

            const { nomedisciplina, qtde_aulas, professor } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            
            
            // Verifica se o disciplina existe no banco de dados
            const disciplinaExists = await DisciplinaModel.findByPk(id);
            
            if (!disciplinaExists) return httpHelper.notFound('disciplina não encontrado!');
            
            // Atualiza os dados do disciplina no banco de dados
            await DisciplinaModel.update({
                nomedisciplina, qtde_aulas, professor
            }, {
                where: { id }
            });
            
            return httpHelper.ok({
                message: 'disciplina atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { DisciplinaController };
