const router = require('express').Router();

const {
    getAllThought,
    createThought,
    getThoughtById,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../controllers/thought-controller');

router.route('/:userId').post(createThought);
router.route('/').get(getAllThought);

router.route("/:thoughtId").get(getThoughtById);

router.route("/:thoughtId").delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction);
router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;