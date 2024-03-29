// backend/routes/api/spots.js
const express = require('express');
const { Op } = require('sequelize')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const router = express.Router();


router.get('/', async (req, res) => {
    let { page, size, maxLat, minLat, maxLng, minLng, maxPrice, minPrice } = req.query;
    let where = {};
    let errors = {};

    if (page < 1) errors.page = "Page must be greater than or equal to 1";
    if (size < 1) errors.size = "Size must be greater than or equal to 1";

    if (maxLat && maxLat > 90 || maxLat < -90) errors.maxLat = "Maximum latitude is invalid";
    else if (maxLat) where.lat = { [Op.lte]: maxLat };

    if (minLat && minLat > 90 || minLat < -90) errors.minLat = "Minimum latitude is invalid";
    else if (minLat) where.lat = { [Op.gte]: minLat };


    if (maxLng && maxLng > 180 || maxLng < -180) errors.maxLng = "Maximum longitude is invalid";
    else if (maxLng) where.lng = { [Op.lte]: maxLng };

    if (minLng && minLng > 180 || minLng < -180) errors.minLng = "Minimum latitude is invalid";
    else if (minLng) where.lng = { [Op.gte]: minLng }

    if (maxPrice && maxPrice < 0) errors.maxPrice = "Maximum price must be greater than or equal to 0";
    else if (maxPrice) where.price = { [Op.lte]: maxPrice };

    if (minPrice && minPrice < 0) errors.minPrice = "Minimum price must be greater than or equal to 0";
    else if (minPrice) where.price = { [Op.gte]: minPrice };

    if (Object.keys(errors).length) {
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors
        });
    };

    let pagination = {};

    page = Number(page);
    size = Number(size);

    if (isNaN(page)) page = 1;
    if (isNaN(size)) size = 20;

    if (page > 10) page = 10;
    if (size > 20) size = 20;

    pagination.limit = size;
    pagination.offset = size * (page - 1);

    const Spots = await Spot.findAll({
        where,
        ...pagination
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
            spotJson.avgRating = Number(rating)
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

    res.json({ Spots: payload, page, size });
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
            spotJson.avgRating = Number(rating)
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

    if (numReviews === 0) numReviews = "No Reviews Yet";

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

    if (!images.length) {
        spot.SpotImages = "No Spot Images Available";
    } else {
        spot.SpotImages = images;
    };

    let spotOwner = await User.findOne({
        where: {
            id: spot.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    });

    spot = spot.toJSON();

    spot.numReviews = numReviews;
    Number(avgStars) === 0 ? spot.avgStarRating = "No Reviews Yet" : spot.avgStarRating = Number(avgStars);

    if (!images.length) {
        spot.SpotImages = "No Spot Images Available";
    } else {
        spot.SpotImages = images;
    };

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
    // check('lat')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Valid Latitude is required'),
    // check('lat')
    //     .isFloat({min: -90, max: 90})
    //     .withMessage("Latitude is not valid"),
    // check('lng')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Valid Longitude is required'),
    // check('lng')
    //     .isFloat({min: -180, max: 180})
    //     .withMessage("Longitude is not valid"),
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
    check('price')
        .isInt({min: 0})
        .withMessage("Price per day is not valid"),
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

    await spot.update({
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

    res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { id } = req.user;

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
            message: "Forbidden",
            statusCode: 403
        });
    };

    await spot.destroy();

    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    });
});


// start of reviews routes to be moved eventually
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

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

    res.status(200).json({ Reviews: payload });
});


const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { id } = req.user;
    const { spotId } = req.params;
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
        },
        include: [User]
    });

    res.status(201).json(newReview);
});
// end of reviews routes to be moved eventually

//start of bookings routes to be moved eventually
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { id } = req.user;

    let spot = await Spot.findOne({
        where: {
            id: spotId
        }
    });

    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    if (spot.ownerId !== id) {
        let Bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['spotId', 'startDate', 'endDate', 'id']
        });

        res.status(200).json({ Bookings })

    } else {
        let Bookings = await Booking.findAll({
            where: {
                spotId: spotId
            }
        });

        let payload = [];
        for (let booking of Bookings) {
            let bookingJson = booking.toJSON();
            let bookingUser = await User.findOne({
                where: {
                    id: booking.userId
                },
                attributes: ['id', 'firstName', 'lastName']
            });

            bookingJson.User = bookingUser;
            payload.push(bookingJson);
        };

        res.status(200).json({ Bookings: payload })
    };
});

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage("Must enter a valid startDate"),
    // check('startDate')
    //     .custom((value, {req}) => new Date(value).getTime() >= new Date(req.body.endDate).getTime())
    //     .withMessage("startDate cannot be on or after endDate"),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage("Must enter a valid endDate"),
    // check('endDate')
    //     .isAfter('startDate')
    //     .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
];

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
    const { spotId } = req.params;
    const { id } = req.user;
    const { startDate, endDate } = req.body;

    let startDateCheck = new Date(startDate).toISOString().split("T")[0];
    let endDateCheck = new Date(endDate).toISOString().split("T")[0];

    if (endDateCheck <= startDateCheck) {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });
    };

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

    if (spot.ownerId === id) {
        return res.status(403).json({
            message: "User owns this property. No need to book through our service.",
            statusCode: 403
        });
    };

    let bookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    });

    let errors = {};
    for (let booking of bookings) {
        let startDateNum = new Date(startDate).getTime();
        let endDateNum = new Date(endDate).getTime();

        let bookingStartDate = new Date(booking.startDate).getTime();
        let bookingEndDate = new Date(booking.endDate).getTime();

        if (startDateNum >= bookingStartDate && startDateNum <= bookingEndDate) {
            errors.startDate = "Start date conflicts with an existing booking";
        };

        if (endDateNum >= bookingStartDate && endDateNum <= bookingEndDate) {
            errors.endDate = "End date conflicts with an existing booking";
        };
    };

    if (Object.keys(errors).length) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors
        });
    };

    await Booking.create({
        spotId: spotId,
        userId: id,
        startDate: startDate,
        endDate: endDate
    });

    let newBooking = await Booking.findOne({
        where: {
            spotId: spotId,
            startDate: startDate
        }
    });

    res.status(200).json(newBooking);
});


module.exports = router;
