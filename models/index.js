const User = require('./User.js');
const {Thought, Reaction} = require('./Thought');

// This file requires the models, brings them in, turns them into objects, and exports them.

module.exports = { User, Thought, Reaction };