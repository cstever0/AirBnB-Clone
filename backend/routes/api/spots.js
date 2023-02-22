// backend/routes/api/spots.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
const router = express.Router();


router.get('/', async (req, res) => {
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

    res.json({ Spots: payload });
});

router.get('/current', requireAuth, async (req, res) => {
    const { id } = req.user;

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

    res.json({ Spots: payload });
});

router.get('/:spotId', async (req, res) => {
    let { spotId } = req.params;

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
        .withMessage('Must have a Name'),
    check('name')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { id } = req.user;
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

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { id } = req.user;
    const { url, preview } = req.body;

    let spot = await Spot.findOne({
        where: {
            id: spotId
        }
    });

    if (!spot) {
        return res.status(404).toJSON({
            message: "Spot couln't be found",
            statusCode: 404
        });
    };

    if (spot.ownerId !== id) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        });
    };

    await SpotImage.create({
        spotId: spotId,
        url: url,
        preview: preview
    });

    const newImage = await SpotImage.findOne({
        where: {
            url: url
        },
        attributes: ['id', 'url', 'preview']
    });

    res.status(201).json(newImage);
});

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { spotId } = req.params;
    const { id } = req.user;
    let { address, city, state, country, lat, lng, name, description, price } = req.body;

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

    if (spot.ownerId !== id) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        });
    };

    spot = spot.toJSON();

    spot.address = address || spot.address;
    spot.city = city || spot.city;
    spot.state = state || spot.state;
    spot.country = country || spot.country;
    spot.lat = lat || spot.lat;
    spot.lng = lng || spot.lng;
    spot.name = name || spot.name;
    spot.description = description || spot.description;
    spot.price = price || spot.price;

    res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const {spotId} = req.params;
    const {id} = req.user;

    let spot = await Spot.findOne({
        where: {
            id: spotId,
            ownerId: id
        }
    });

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    // if (spot.ownerId !== id) {
    //     return res.status(403).json({
    //         message: "Forbidden",
    //         statusCode: 403
    //     });
    // };

    await spot.destroy();

    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    });
});


// reviews routes to be moved eventually
router.get('/:spotId/reviews', async (req, res) => {
    const {spotId} = req.params;

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

    let Reviews = await Review.findAll({
        where: {
            spotId: spotId
        }
    });

    let payload = [];
    for (let review of Reviews) {
        let reviewJson = review.toJSON();
        let reviewUser = await User.findOne({
            where: {
                id: review.userId
            },
            attributes: ['id', 'firstName', 'lastName']
        });

        reviewJson.User = reviewUser;

        let reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: ['id', 'url']
        });

        if (!reviewImages.length) {
            reviewJson.ReviewImages = "No review images yet";
        } else {
            reviewJson.ReviewImages = reviewImages;
        };

        payload.push(reviewJson);
    };

    res.status(200).json({Reviews: payload});
});


const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .isInt({min: 1, max: 5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const {id} = req.user;
    const {spotId} = req.params;
    const { review, stars } = req.body;

    const spot = await Spot.findOne({
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

    const reviewExists = await Review.findOne({
        where: {
            userId: id,
            spotId: spotId
        }
    });

    if (reviewExists) {
        return res.status(403).json({
            message: "User already has a review for this spot",
            statusCode: 403
        });
    };

    await Review.create({
        userId: id,
        spotId: spotId,
        review: review,
        stars: stars
    });

    let newReview = await Review.findOne({
        where: {
            review: review
        }
    });

    res.status(201).json(newReview);
});


module.exports = router;
