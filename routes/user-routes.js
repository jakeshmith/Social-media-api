const router = require('express').Router();

// These are all of the functions that can be used at the user routes defined, below.
const {
    getAllUser,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    createFriend,
    deleteFriend
} = require('../controllers/user-controllers');

//  from users/, these two can be accessed.
router.route('/').get(getAllUser);
router.route('/').put(createUser);

// from users/:id, these can be accessed.
router.route('/:id').get(getUserById);
router.route('/:id').post(updateUserById);
router.route('/:id').delete(deleteUserById);

// These routes are here to allow two users to become "friends"
router.route('/:userId/friends/:friendId').put(createFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;