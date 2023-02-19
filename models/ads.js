const mongoose = require('mongoose');

const Ads = mongoose.model('Ads', new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}));

module.exports = Ads;