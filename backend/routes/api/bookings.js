// backend/routes/api/spots.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    const { id } = req.user;

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

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { id } = req.user;
    const { startDate, endDate } = req.body;

    let startDateCheck = new Date(startDate).getTime();
    let endDateCheck = new Date(endDate).getTime();

    if (endDateCheck <= startDateCheck) {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });
    };

    let booking = await Booking.findOne({
        where: {
            id: bookingId
        }
    });

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    };

    if (booking.userId !== id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    let today = new Date().getTime();
    let bookingEndDateCheck = new Date(booking.endDate).getTime();

    if (bookingEndDateCheck < today) {
        return res.status(403).json({
            message: "Past bookings can't be modified",
            statusCode: 403
        });
    };

    let bookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    });

    let errors = {};
    for (let bookingCheck of bookings) {
        let startDateNum = new Date(startDate).getTime();
        let endDateNum = new Date(endDate).getTime();

        let bookingStartDate = new Date(bookingCheck.startDate).getTime();
        let bookingEndDate = new Date(bookingCheck.endDate).getTime();

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

    await booking.update({
        startDate: startDate,
        endDate: endDate
    });

    res.status(200).json(booking);
});

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { id } = req.user;

    let booking = await Booking.findOne({
        where: {
            id: bookingId
        }
    });

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    };

    let spot = await Spot.findOne({
        where: {
            id: booking.spotId
        }
    });

    let today = new Date().getTime();
    let bookingStartCheck = new Date(booking.startDate).getTime();

    if (bookingStartCheck < today) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        });
    };

    if (booking.userId === id || spot.ownerId === id) {
        await booking.destroy();
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });
    } else {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    };
});


module.exports = router;
