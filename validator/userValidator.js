const Joi = require("@hapi/joi");


const loginValidator = async (data)=>{
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password : Joi.string().min(8).required(),
    });
    return schema.validate(data);
};

const registerValidator = async (data)=>{
    const schema = Joi.object({
        name : Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.number().min(8).required(),
        password : Joi.string().min(8).required(),
    });
    return schema.validate(data);
};

module.exports = {loginValidator, registerValidator};