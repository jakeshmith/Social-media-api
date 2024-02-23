const router = require('express').Router();

const {
    getAllThought,
    createThought,
    getThoughtById,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../controllers/thought-controller');

// This route allows a thought to be created through the user Id
router.route('/:userId').post(createThought);

// This returns all thoughts
router.route('/').get(getAllThought);

// This returns a specific thought by searching for its id
router.route("/:thoughtId").get(getThoughtById);

// Through the idea, a thought can be deleted.
router.route("/:thoughtId").delete(deleteThought);

// These allow the creation and deletion of reactions for each thought
router.route("/:thoughtId/reactions").post(createReaction);
router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;