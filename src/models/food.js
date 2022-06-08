"use strict";

const food = (sequelize, DataTypes) =>
    sequelize.define("food", {
        namOfFood: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        category: {
            type: DataTypes.STRING,
        },
    });

    module.exports = food;
