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

router.get('/current', requireAuth, async (req, res) => {
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
});

router.get('/:spotId', async (req, res) => {
    let {spotId} = req.params;

    let spot = await Spot.findOne({
        where: {
            id: spotId
        }
    });

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    let numReviews = await Review.count({
        where: {
            spotId: spotId
        }
    });

    let avgRating = await Review.findOne({
        where: {
            spotId: spotId
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        ]
    });

    let avgStars = avgRating.dataValues.avgRating;

    let images = await SpotImage.findAll({
        where: {
            spotId: spotId
        },
        attributes: [
            'id', 'url', 'preview'
        ]
    });

    let spotOwner = await User.findOne({
        where: {
            id: spot.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    });

    spot = spot.toJSON();
    spot.numReviews = numReviews
    spot.avgStarRating = avgStars;
    spot.SpotImages = images;
    spot.Owner = spotOwner;

    res.json(spot);
});

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Must have a Name and Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const {id} = req.user;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    await Spot.create({
        ownerId: id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    });

    const newSpot = await Spot.findOne({
        where: {
            name: name
        }
    });

    res.status(201).json(newSpot)
});

module.exports = router;
