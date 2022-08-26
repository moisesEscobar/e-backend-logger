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
}

module.exports = new MainController();
