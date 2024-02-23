const { Thought, User } = require("../models");

const thoughtController = {
  // This will find all Thoughts
  getAllThought(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // This is a get request to find one Thought by Id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // this creates a Thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(dbThoughtData => {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: dbThoughtData._id }},
          { new: true }
        )
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ message: "No user found with this Id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
  },
  // This is how a Reaction is created
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .select("-id")
      .then((dbUserData) => {
        console.log(dbUserData);
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // This removes a Thought by searching for the Id and deleting it
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: "No thought with that Id"});
        return;
      }
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId }},
        )
      .then(() => {
          res.status(200).json({ message: `Successfully deleted the thought from user id ${params.userId}` });
      })
      .catch(err => res.status(500).json(err));
    })  
    .catch(err => res.status(500).json(err));
  },
  
  // This deletes a reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;