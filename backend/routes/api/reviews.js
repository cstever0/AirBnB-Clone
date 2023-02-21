// backend/routes/api/reviews.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    const {id} = req.user;

    let Reviews = await Review.findAll({
        where: {
            userId: id
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

        let reviewSpot = await Spot.findOne({
            where: {
                id: review.spotId
            }
        });

        reviewSpot = reviewSpot.toJSON();

        let preImage = await SpotImage.findOne({
            where: {
                spotId: reviewSpot.id,
                preview: true
            },
            attributes: ['url']
        });
        if (!preImage) {
            reviewSpot.previewImage = 'No preview available'
        } else {
            reviewSpot.previewImage = preImage.url
        };

        let reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: ['id', 'url']
        });


        reviewJson.User = reviewUser;
        reviewJson.Spot = reviewSpot;
        reviewJson.ReviewImages = reviewImages;
        payload.push(reviewJson);
    };

    res.status(200).json({Reviews: payload});
});

module.exports = router;
