const mongoose = require('mongoose');
const user = mongoose.model('users', userSchema);

let transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },

    user: {
        type: [Schema.Types.ObjectId],
        ref: 'users'
        }
    }

    date: {
        type: Date,
        required: true,
    }

});

module.exports = mongoose.model('transacations', transactionSchema);
