'use strinct';

const Log = require("../models/Log");
const Aplication = require("../models/Aplication");
const Authorization = require("../models/Authorization");
const NAME = require("../config/constants");
var randomToken = require('random-token');

class MainController {

	async initSeeder(req, res, next) {
		try {
            let bdAplication = await Aplication.findOne({name:NAME});
            let token = randomToken(16);
            
            if(!bdAplication){
                bdAplication = await Aplication.create({name: NAME})
                await Authorization.create(
                    {
                        application_id: bdAplication._id,
                        token: token
                    }
                );
            }
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
	}

    async getAplication(req, res, next) {
		try {
            let aplication = await Aplication.aggregate([
                {
                  '$lookup': {
                    'from': 'autohorizations', 
                    'localField': '_id', 
                    'foreignField': 'application_id', 
                    'as': 'authorization'
                  }
                }, {
                  '$unwind': { 'path': '$authorization'}
                }
            ]);

            res.status(200).json({
                status: 200,
                message: 'Get all applications',
                data: aplication
            });
    
        } catch (error) {
            if (error.code === 500) {
                return next(new HttpError(error.message.status, error.message));
            }
            res.status(400).json({
                status: 400,
                message: error.message
            });
        }
	}
}

module.exports = new MainController();
