const { Model, DataTypes } = require("sequelize");

class DisciplinaModel extends Model {
    static init(database) {
        super.init({
            nomedisciplina: DataTypes.STRING,
            qtde_aulas:DataTypes.INTEGER,
            professor: DataTypes.STRING,
            usuarioId: DataTypes.INTEGER,
            turmasId: DataTypes.INTEGER
        }, {
            tableName: 'disciplinas',
            modelName: 'DisciplinaModel',
            timestamps: false,
            sequelize: database
        });
    }
        static associate(models){
            this.belongsTo(models.UserModel, { foreignKey: 'usuarioId'})
            this.belongsTo(models.TurmasModel, { foreignKey: 'TurmasId'})

    }
}

module.exports = { DisciplinaModel };
