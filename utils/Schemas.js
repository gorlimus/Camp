const baseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeNTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = baseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeNTML(),
        // image: Joi.string().required(),
        price: Joi.number().required().min(1),
        description: Joi.string().required().escapeNTML(),
        location: Joi.string().required().escapeNTML()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required().escapeNTML(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
});

