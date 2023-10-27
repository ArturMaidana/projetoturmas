'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            nome: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: false
            },
            sobrenome: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: false
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    }
};
