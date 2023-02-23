// backend/routes/api/spot-images.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const booking = require('../../db/models/booking');
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const { id } = req.user;

    let image = await SpotImage.findOne({
        where: {
            id: imageId
        }
    });

    if (!image) {
        return res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        });
    };

    let spot = await Spot.findOne({
        where: {
            id: image.spotId
        }
    });

    if (spot.ownerId !== id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    await image.destroy();

    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
