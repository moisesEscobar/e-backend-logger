const mongooses = require("mongoose");

const url_conection = "mongodb://localhost:27017/bd_tendencys";

const InitServerMongo = async() =>{
    try{
        await mongooses.connect(url_conection,{
            useNewUrlParser: true
        });
        console.log("Base de datos conectada");
    }catch (error){
        console.log(error)
    }
};

module.exports = InitServerMongo;