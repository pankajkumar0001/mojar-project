const Joi = require('joi');
const reviews = require('./models/reviews');


module.exports.listingSchema =  Joi.object({
        listing: Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required(),
        location:Joi.string().required().min(0),
        country:Joi.string().required()
    }).required()
})

module.exports.reviweSchema= Joi.object({
        reviews:Joi.object({
        rating:Joi.number().required().min(0).max(5),
        comment:Joi.string().required()

    }).required()
})