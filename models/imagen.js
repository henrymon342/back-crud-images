
module.exports = (sequelize, DataTypes) =>{
    const Imagen = sequelize.define("Imagen", {
        
        idAsosiado:{
            type: DataTypes.STRING,
            allowNull: false
        },
        imagePath:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cloudinary_id:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Imagen;
}