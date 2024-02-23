const { Schema, model, Types } = require('mongoose');

// In this file, I created two classes, one for reactions and one for Thoughts. They are both exported at the bottom of the file.
const reactionSchema = new Schema(
    {
        reactionId: {
            type: String,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
);

// This is the model for the thoughts, to be used when querying.
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
// This creates a reaction count for each thought. This essentially connects the two models together, and lets the user know how many reactions one of their Thoughts has.
thoughtSchema.virtual('reactionCount').get(function () {
    return `reactions: ${this.reactions.length}`;
    });

const Thought = model('Thought', thoughtSchema);
const Reaction = model('Reaction', reactionSchema);

// here, both models are exported.
module.exports = { Thought, Reaction};