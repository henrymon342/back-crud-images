
module.exports = (sequelize, DataTypes) =>{
    const Peticion = sequelize.define("Peticion", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ciudad:{
            type: DataTypes.STRING,
            allowNull: false
        },
        correo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        peticion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
        
    });


    return Peticion;
}