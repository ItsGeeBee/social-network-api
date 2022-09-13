const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Create a new instance of the Mongoose schema to define shape of each document
const ReactionSchema = new Schema({
    // Add individual properties and their types
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Create a new instance of the Mongoose schema to define shape of each document
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
// Create a virtual property `reactionCount` that gets the amount of reactions per post
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize the Thought model
const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;