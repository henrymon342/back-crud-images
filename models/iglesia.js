
module.exports = (sequelize, DataTypes) =>{
    const Iglesia = sequelize.define("Iglesia", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idPastor:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ubicacion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fundacion:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        superdni:{
            type: DataTypes.STRING,
            allowNull: false
        },
        presimni:{
            type: DataTypes.STRING,
            allowNull: false
        },
        presijni:{
            type: DataTypes.STRING,
            allowNull: false
        },
        diacentral:{
            type: DataTypes.STRING,
            allowNull: false
        },
        horacentralini:{
            type: DataTypes.STRING,
            allowNull: false
        },
        horacentralfin:{
            type: DataTypes.STRING,
            allowNull: false
        },
        diajni:{
            type: DataTypes.STRING,
            allowNull: false
        },
        horajniini:{
            type: DataTypes.STRING,
            allowNull: false
        },
        horajnifin:{
            type: DataTypes.STRING,
            allowNull: false
        },
        zona:{
            type: DataTypes.STRING,
            allowNull: false
        },
    });


    return Iglesia;
}