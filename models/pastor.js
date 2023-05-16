
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
        direccion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        celular:{
            type: DataTypes.STRING,
            allowNull: false
        },
        correo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_nac:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lugar_nac:{
            type: DataTypes.STRING,
            allowNull: false
        },
        estado_civil:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre_esposa:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_nac_esposa:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lugar_nac_esposa:{
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
        },
        data_family:{
            type: DataTypes.STRING,
            allowNull: true
        },
        educacion:{
            type: DataTypes.STRING,
            allowNull: true
        }
        
    });

    return Pastor;
}

