const { Model, DataTypes } = require("sequelize");

class UserModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.TEXT,
            sobrenome: DataTypes.TEXT,
            email: DataTypes.TEXT,
            password: DataTypes.TEXT
        }, {
            tableName: 'user',
            modelName: 'UserModel',
            timestamps: false,
            sequelize: database
        });
    }
        static associate(models){
            this.hasMany(models.TurmasModel, { foreignKey: 'usuarioId'})
            this.hasMany(models.AlunosModel, { foreignKey: 'usuarioId'})
    } 
    
}

module.exports = { UserModel };
