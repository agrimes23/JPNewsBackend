const mongoose = require('mongoose');

const favsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    savedKanji: {},
    flashcardSets: {}
})