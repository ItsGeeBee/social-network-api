const { User, Thought} = require('../models');

module.exports = {
  getAllThought(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
},

  // get one thoughts by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
    .populate({ path: "reactions", select: "-__v" })
    .then((thought) =>
      !thought
        ? res.status(400).json({ message: "Thought does not exist" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

  createThought({ body }, res) {
    Thought.create(body)
        .then(({response}) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: response._id } },
                { new: true }
            );
        })
        .then(thoughts => {
            if (!thoughts) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(thoughts);
        })
        .catch(err => res.json(err));
},

  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.id },
        body, 
        { new: true, runValidators: true }
    )
      .then(thoughts => {
        if (!thoughts) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        res.json(thoughts);
      })
      .catch(err => res.json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: thought.reaction } })
      )
      .then(() => res.json({ message: 'Thought and any related reactions are now deleted' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.Id },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
    )
    .then((thoughts) =>
        !thoughts
        ? res.status(404).json({ message: 'Oops -- No thought with that ID' })
        : res.json(thoughts)
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
},

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.Id },
    { $pull: { reactions: { _id: req.params.reactionId } } },
    { runValidators: true, new: true }
    )
    .then((thoughts) =>
        !thoughts
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thoughts)
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
},

};