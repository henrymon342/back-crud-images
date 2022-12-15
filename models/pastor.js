
module.exports = (sequelize, DataTypes) =>{
    const Pastor = sequelize.define("Pastor", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        category:{
            type: DataTypes.STRING,
            allowNull: false
        },
        year:{
            type: DataTypes.STRING,
            allowNull: false
        },
        area:{
            type: DataTypes.STRING,
            allowNull: false
        },
        membresia:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lugardeministerio:{
            type: DataTypes.STRING,
            allowNull: false
        },
        titulos:{
            type: DataTypes.STRING,
            allowNull: true
        },
        requisitos:{
            type: DataTypes.STRING,
            allowNull: true
        }
        
    });

    // Pastor.associate = models => {
    //     Pastor.hasOne(models.Record, {
    //         onDelete: 'cascade'
    //     });

    // }


    return Pastor;
}