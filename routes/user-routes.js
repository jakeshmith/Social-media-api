const router = require('express').Router();

const {
    getAllUser,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    createFriend,
    deleteFriend
} = require('../controllers/user-controllers');

router.route('/').get(getAllUser);
router.route('/').get(createUser);

router.route('/:id').get(getUserById);
router.route('/:id').put(updateUserById);
router.route('/:id').delete(deleteUserById);

router.route('/:userId/friends/:friendId').put(createFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;