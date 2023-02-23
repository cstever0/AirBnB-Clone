// backend/routes/api/spot-images.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const booking = require('../../db/models/booking');
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    const {imageId} = req.params;
    const {id} = req.user;

    let reviewImage = await ReviewImage.findOne({
        where: {
            id: imageId
        }
    });

    if (!reviewImage) {
        return res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        });
    };

    let review = await Review.findOne({
        where: {
            id: reviewImage.reviewId
        }
    });

    if (review.userId !== id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    await reviewImage.destroy();

    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
