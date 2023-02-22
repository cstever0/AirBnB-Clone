// backend/routes/api/spots.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    const {id} = req.user;

    let Bookings = await Booking.findAll({
        where: {
            userId: id
        }
    });

    let payload = [];
    for (let booking of Bookings) {
        let bookingJson = booking.toJSON();
        let bookingSpot = await Spot.findOne({
            where: {
                id: booking.spotId
            }
        });

        bookingSpot = bookingSpot.toJSON();

        let preImage = await SpotImage.findOne({
            where: {
                spotId: bookingSpot.id,
                preview: true
            },
            attributes: ['url']
        });
        if (!preImage) {
            bookingSpot.previewImage = "No preview available"
        } else {
            bookingSpot.previewImage = preImage.url
        };


        bookingJson.Spot = bookingSpot;
        payload.push(bookingJson);
    };

    res.status(200).json({ Bookings: payload });
});


module.exports = router;
