const { Model, DataTypes } = require("sequelize");

class TurmasModel extends Model {
    static init(database) {
        super.init({
            nometurmas:DataTypes.STRING,
            ensino: DataTypes.STRING,
            turno:DataTypes.STRING,     
            cargaHoraria:DataTypes.INTEGER,
            data_inicio:DataTypes.STRING,
            data_final:DataTypes.STRING,
            usuarioId: DataTypes.STRING,

        }, {
            tableName: 'turma',
            modelName: 'TurmasModel',
            timestamps: false,
            sequelize: database
        });
    }
    
        static associate(models){
            this.hasMany(models.UserModel, { foreignKey: 'usuarioId'})
    }
}

module.exports = { TurmasModel };
