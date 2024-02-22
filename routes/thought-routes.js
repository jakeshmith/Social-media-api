const router = require('express').Router();

const {
    getAllThought,
    createThought,
    getThoughtById,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require('../controllers/thought-controller');

router.route('/:userId').post(createThought);
router.route('/:userId').get(getAllThought);

router.route("/:userId/:thoughtId").get(getThoughtById);
router.route("/:userId/:thoughtId").post(createReaction);
router.route('/:userId/:thoughtId').put(updateThought);
router.route("/:userId/:thoughtId").delete(deleteThought);

router.route('/:userId/:thoughtId/reactions')
.delete(deleteReaction);

module.exports = router;