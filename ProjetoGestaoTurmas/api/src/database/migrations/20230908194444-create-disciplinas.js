'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('disciplinas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomedisciplina: {
        type: Sequelize.STRING
      },
      qtde_aulas: {
        type: Sequelize.INTEGER
      },
      professor: {
        type: Sequelize.STRING
      },
      usuarioId: {
        type: Sequelize.INTEGER
      },
      turmasId: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('disciplinas');
  }
};