const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { UserModel } = require('../models/user-model');
const { TurmasModel } = require('../models/turmas-model');
const { AlunosModel} = require('../models/alunos-model');
const { DisciplinaModel} = require('../models/disciplina-model');



const database = new Sequelize(configDatabase);

UserModel.init(database);
TurmasModel.init(database);
AlunosModel.init(database);
DisciplinaModel.init(database);


module.exports = database;
