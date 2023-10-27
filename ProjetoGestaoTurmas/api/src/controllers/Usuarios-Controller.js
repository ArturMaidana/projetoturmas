const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user-model');

class UserController {
    // Método para registrar um novo usuário
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nome, sobrenome, email, password } = request.body;
            if (!nome || !sobrenome || !email || !password) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            
            // Verifica se o e-mail do usuário já existe no banco de dados
            const userAlreadyExists = await UserModel.findOne({ where: { email } });
            if (userAlreadyExists) return httpHelper.badRequest('E-mail de usuário já cadastrado!');
            
            // Hash a senha do usuário antes de salvar no banco de dados
            const passwordHashed = await bcrypt.hash(
                password,
                Number(process.env.SALT)
            );
            const user = await UserModel.create({
                nome,
                sobrenome,
                email,
                password: passwordHashed,
            });
            
            if (!user) return httpHelper.badRequest('Houve um erro ao criar usuário');
            
            // Cria um token de acesso (JWT) para o usuário registrado
            const accessToken = jwt.sign(
                { id: user.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            
            return httpHelper.created({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para fazer login de usuário
    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, password } = request.body;
            if (!email || !password) return httpHelper.badRequest('E-mail e senha são obrigatórios!');

            // Verifica se o usuário com o e-mail fornecido existe no banco de dados
            const userExists = await UserModel.findOne({ where: { email } });

            if (!userExists) return httpHelper.notFound('Usuário não encontrado!');

            // Compara a senha fornecida com a senha armazenada no banco de dados
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) return httpHelper.badRequest('Senha incorreta!');
            
            // Cria um token de acesso (JWT) para o usuário autenticado
            const accessToken = jwt.sign(
                { id: userExists.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para listar todos os usuários
    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const users = await UserModel.findAll();
            return httpHelper.ok(users);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para excluir um usuário
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            // Verifica se o usuário com o ID fornecido existe no banco de dados
            const userAlreadyExists = await UserModel.findOne({ where: { id } });
            if (!userAlreadyExists) return httpHelper.notFound('Usuario não encontrado!');
            
            // Exclui o usuário do banco de dados
            await UserModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Usuario deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // Método para atualizar os dados de um usuário
    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nome, sobrenome, email, password } = request.body;
            if (!email) return httpHelper.badRequest('Parâmetros inválidos!');
        
            // Verifica se o usuário com o ID fornecido existe no banco de dados
            const userExists = await UserModel.findByPk(id);
            if (!userExists) return httpHelper.notFound('Usuário não encontrado!');
            
            // Atualiza os dados do usuário no banco de dados
            await UserModel.update({
                nome, sobrenome, email, password
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Usuario atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { UserController };
