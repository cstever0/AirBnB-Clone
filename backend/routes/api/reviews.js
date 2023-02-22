// backend/routes/api/reviews.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    const { id } = req.user;

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

    res.status(200).json({ Reviews: payload });
});

const validateReviewImage = [
    check('url')
        .exists({ checkFalsy: true })
        .withMessage("A valid image link is required")
];

router.post('/:reviewId/images', requireAuth, validateReviewImage, async (req, res) => {
    const { reviewId } = req.params;
    const { id } = req.user;
    const { url } = req.body;

    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId: id
        }
    });

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    if (review.userId !== id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    const reviewImagesTotal = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    });

    if (reviewImagesTotal.length === 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        });
    };

    await ReviewImage.create({
        reviewId: reviewId,
        url: url
    });

    let newImage = await ReviewImage.findOne({
        where: {
            url: url
        },
        attributes: ['id', 'url']
    });

    res.status(200).json(newImage);
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

router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const {reviewId} = req.params;
    const {id} = req.user;
    const { review, stars } = req.body;

    let reviewToEdit = await Review.findOne({
        where: {
            id: reviewId
        }
    });

    if (!reviewToEdit) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    if (reviewToEdit.userId !== id) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        });
    };

    reviewToEdit = reviewToEdit.toJSON();

    reviewToEdit.review = review;
    reviewToEdit.stars = stars;

    res.status(200).json(reviewToEdit);
});

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const {reviewId} = req.params;
    const {id} = req.user;

    let reviewToDelete = await Review.findOne({
        where: {
            id: reviewId
        }
    });

    if (!reviewToDelete) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    if (reviewToDelete.userId !== id) {
        return res.status(404).json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    await reviewToDelete.destroy();

    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
