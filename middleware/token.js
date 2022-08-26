const { Console } = require("console");
const { sign } = require("crypto");
const Aplication = require("../models/Aplication");
const NAME = require("../config/constants");

module.exports = async(request, response, next) =>{ 
  const token = request.header("token");
  if (!token) return response.status(401).json({ 
        message: "The token does not exist in the header" 
    });
  try {
    let tokenBd = await Aplication.aggregate([
      {
        '$lookup': {
          'from': 'autohorizations', 
          'localField': '_id', 
          'foreignField': 'application_id', 
          'as': 'aplication'
        }
      }, {
        '$unwind': { 'path': '$aplication'}
      }, {
        '$match': { 'name': NAME }
      }
    ]);

    if(token==tokenBd[0].aplication.token){
      next();
    }else{
      response.status(401).send({ message: "Permissions denied" });
    }
  } catch (e) {
    console.error(e);
    response.status(500).send({ message: "Invalid token" });
  }
};