const { User, Thought} = require('../models');

module.exports = {
  getAllThought(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
},

  // get one thoughts by id
  getThoughtById(res, res) {
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
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
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
