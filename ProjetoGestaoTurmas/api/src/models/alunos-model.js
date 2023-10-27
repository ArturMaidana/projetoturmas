const { Model, DataTypes } = require("sequelize");

class AlunosModel extends Model {
    static init(database) {
        super.init({
            nomealunos: DataTypes.STRING,
            turma:DataTypes.STRING,
            turno: DataTypes.STRING,
            telefone:DataTypes.STRING,
            dataIngressante:DataTypes.STRING,
            usuarioId: DataTypes.INTEGER,
            turmasId: DataTypes.INTEGER
        }, {
            tableName: 'alunos',
            modelName: 'AlunosModel',
            timestamps: false,
            sequelize: database
        });
    }
        static associate(models){
            this.belongsTo(models.UserModel, { foreignKey: 'usuarioId'})
            this.belongsTo(models.TurmasModel, { foreignKey: 'TurmasId'})

    }
}

module.exports = { AlunosModel };
