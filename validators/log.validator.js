const Joi = require('joi');

class LogValidator {

    addLog(params={
        type: string,
        priority: string,
        path: string,
        message: string
    }) {
        const schema = Joi.object().keys({
            type: Joi.string().required().valid('error','info','warning'),
            priority: Joi.string().required().valid('lowest','low','medium','high','highest'),
            path: Joi.string().allow(''),
            message: Joi.string().allow('')
        }).options({ allowUnknown: true });

        let validationResult = schema.validate(params);
        if (validationResult.error) {
			throw new Error(validationResult.error.message);
		}
    }
}

module.exports = new LogValidator();