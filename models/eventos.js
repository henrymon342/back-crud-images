
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
        lugar:{
            type: DataTypes.STRING,
            allowNull: false
        },
        encargado:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha:{
            type: DataTypes.STRING,
            allowNull: false
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
        // estado:{
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
        // costo:{
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
        presencial:{
            type: DataTypes.STRING,
            allowNull: true
        },
        virtual:{
            type: DataTypes.STRING,
            allowNull: true
        },
        tipofecha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaini:{
            type: DataTypes.STRING,
            allowNull: true
        },
        fechafin:{
            type: DataTypes.STRING,
            allowNull: true
        }
        
    });


    return Eventos;
}