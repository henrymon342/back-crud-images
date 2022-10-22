
module.exports = (sequelize, DataTypes) =>{
    const Eventos = sequelize.define("Eventos", {
        ministerio:{
            type: DataTypes.STRING,
            allowNull: false
        },
        titulo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        modalidad:{
            type: DataTypes.STRING,
            allowNull: false
        },
        optionplace:{
            type: DataTypes.STRING,
            allowNull: false
        },
        place:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tipofecha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fechasingle:{
            type: DataTypes.STRING,
            allowNull: true
        },
        fechaini:{
            type: DataTypes.STRING,
            allowNull: true
        },
        fechafin:{
            type: DataTypes.STRING,
            allowNull: true
        },
        horaini:{
            type: DataTypes.STRING,
            allowNull: false
        },
        horafin:{
            type: DataTypes.STRING,
            allowNull: true
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        encargado:{
            type: DataTypes.STRING,
            allowNull: true
        }
        
    });


    return Eventos;
}