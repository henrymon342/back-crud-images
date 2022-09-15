
module.exports = (sequelize, DataTypes) =>{
    const Asignatura = sequelize.define("Asignatura", {
        numero:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombremateria:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nota:{
            type: DataTypes.STRING,
            allowNull: false
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        idFKPastor:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });


    return Asignatura;
}