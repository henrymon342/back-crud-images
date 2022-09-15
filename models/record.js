
module.exports = (sequelize, DataTypes) =>{
    const Record = sequelize.define("Record", {
        materia1:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia2:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia3:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia4:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia5:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia6:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia7:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia8:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia9:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia10:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia11:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia12:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia13:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia14:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia15:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia16:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia17:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia18:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia19:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia20:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia21:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia22:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia23:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia24:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia25:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia26:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia27:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia28:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia29:{ type: DataTypes.BOOLEAN, allowNull: false },
        materia30:{ type: DataTypes.BOOLEAN, allowNull: false },
    });

    // Record.associate = models => {
    //     Record.belongsTo(models.Pastor, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // }

    return Record;
}