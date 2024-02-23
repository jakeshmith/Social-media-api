const { User } = require("../models");

const userController = {
  // This gets all Users
  getAllUser(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // This gets one User by Id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      // This populates thoughts from Thought
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // This creates a new User
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // This updates a User's data by Id
  updateUserById({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No User found with this Id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // This creates a friend relationship for the user
  createFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      {$push: {friends: params.friendId}},
      {new: true}
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: "No User found with this Id!" });
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
  },
  // This is going to delete a friend relationship with the user
  deleteFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      {$pull: {friends: params.friendId}},
      {new: true}
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));  },

  // This deletes a User by id
  deleteUserById({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

};

module.exports = userController;