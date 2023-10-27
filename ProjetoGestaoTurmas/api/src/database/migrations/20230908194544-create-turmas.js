'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('turma', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nometurmas: {
        type: Sequelize.STRING
      },
      ensino:{
        type: Sequelize.STRING
      },
      turno:{
        type:Sequelize.STRING,
        allowNull: false
      },
      cargaHoraria: {
        type: Sequelize.INTEGER
      },
      data_inicio: {
        type: Sequelize.STRING
      },
      data_final:{
        type: Sequelize.STRING
      },
      usuarioId: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Turmas');
  }
};