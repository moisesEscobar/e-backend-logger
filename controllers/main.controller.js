'use strinct';
const Authorization = require("../models/Authorization");
const Log = require("../models/Log");
const Aplication = require("../models/Aplication");
const logValidator = require("../validators/log.validator");
const mongoose = require('mongoose');


class MainController {

	async all(req, res, next) {
		try {
            let logs = await Log.find();

            res.status(200).json({
                status: 200,
                message: 'Get all logs',
                data: logs
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

	async create(req, res, next) {
		try {
            const data = req.body;
            const aplication = await Aplication.findOne({"name":NAME});
            if (!aplication) {
                throw new Error('Aplication does not exist.')
            }

            data.application_id = aplication._id;
            logValidator.addLog(data);
            const log = await Log.create(data);
    
            res.status(200).json({
                status: 200,
                message: 'Log created',
                data: log
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

	async info(req, res, next) {
		try {
            const log = await Log.findById(req.params.id);
            if (!log) {
                throw new Error('Log does not exist.')
            }
    
            res.status(200).json({
                status: 200,
                message: 'Log get',
                log
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

	async update(req, res, next) {
		try {
            const data = req.body;
            logValidator.addLog(data);
            
            let dbResult = await Log.updateOne(
                {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                },
                req.body
            );

            if(dbResult.matchedCount !== 1){
                throw new Error('The log you want to update does not exist.');
            }
            if(dbResult.modifiedCount === 0){
                throw new Error('Could not update.');
            }
    
            res.status(200).json({
                status: 200,
                message: 'Log Updated'
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

	async delete(req, res, next) {
		try {
            let dbResult = await Log.deleteOne(
                {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            );
    
            if(dbResult.deletedCount !== 1){
                throw new Error('The log you want to delete does not exist.');
            }
            if(dbResult.deletedCount === 0){
                throw new Error('Could not delete.');
            }

            res.status(200).json({
                status: 200,
                message: 'Log Deleted'
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
