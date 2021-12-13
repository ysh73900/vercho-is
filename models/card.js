const mongoose = require("mongoose");
// const Location = require("./location");
// Card Schema

const CardSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    zonename: {
        type: String,
        required: true
    },
    avaliablezone: {
        type: String,
        required: true
    }
});


const Card = mongoose.model("Card", CardSchema);



Card.getCardById = function (id, callback) {
    Card.findById(id, callback);
};

Card.getCardByUsername = function (username, callback) {
    const query = {
        username: username
    };
    Card.findOne(query, callback);
};

Card.addCard = function (newCard, callback) {
    newCard.save(callback);
};


Card.updateCard = function (username, newCard, callback) {
    const query = { username: username };

    const update = {
        name: newCard.name,
        tel: newCard.tel,
        zonename: newCard.zonename,
        avaliablezone: newCard.avaliablezone
    };


    Card.findOneAndUpdate(query, update, {
        new: true,
        useFindAndModify: false
    }, callback);
};

// Return all user list
Card.getAll = function (callback) {
    Card.find(callback);
};





module.exports = Card;