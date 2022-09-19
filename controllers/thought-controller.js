const { User, Thought} = require('../models');

module.exports = {
  // Get all thoughts 
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
// create a new thought 
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

  // Update Thought by id
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

  // Delete a thought by id
  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought does not exist" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add reaction to an exisiting thought 
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


addReaction({params, body}, res) {
  Thought.findOneAndUpdate(
    {_id: params.thoughtId}, 
    {$push: {reactions: body}}, 
    {new: true, runValidators: true})
  .populate({path: 'reactions', select: '-__v'})
  .select('-__v')
  .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({message: 'No thoughts with this ID.'});
          return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => res.status(400).json(err))
},

// delete reaction
deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No reaction found with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

};