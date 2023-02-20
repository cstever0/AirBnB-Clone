// backend/routes/api/spots.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
const router = express.Router();


router.get('/', async (req, res) =>{
    const Spots = await Spot.findAll();

    let payload = [];
    for (let spot of Spots) {
        let spotJson = spot.toJSON();
        const spotRating = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        });

        let rating = spotRating.dataValues.avgRating
        if (!rating) {
            spotJson.avgRating = 'No reviews yet'
        } else {
            spotJson.avgRating = rating
        };

        let preImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ['url']
        });
        if (!preImage) {
            spotJson.previewImage = 'No preview available'
        } else {
            spotJson.previewImage = preImage.url
        };

        payload.push(spotJson);
    };

    res.json({Spots: payload});
});

router.get('/current', requireAuth, handleValidationErrors, async (req, res) => {
    const {id} = req.user;

    const Spots = await Spot.findAll({
        where: {
            ownerId: id
        }
    });

    let payload = [];
    for (let spot of Spots) {
        let spotJson = spot.toJSON();
        const spotRating = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        });

        let rating = spotRating.dataValues.avgRating
        if (!rating) {
            spotJson.avgRating = 'No reviews yet'
        } else {
            spotJson.avgRating = rating
        };

        let preImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ['url']
        });
        if (!preImage) {
            spotJson.previewImage = 'No preview available'
        } else {
            spotJson.previewImage = preImage.url
        };

        payload.push(spotJson);
    };

    res.json({Spots: payload});
})

module.exports = router;
