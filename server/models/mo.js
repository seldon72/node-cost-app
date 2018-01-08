var mongoose = require('mongoose');

var ManoObra = mongoose.model('ManoObra', {
    planta: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    uom: {
        type: String,
        trim: true 
    },
    unitCost: {
        type: Number,
        default: null
    },
    billId: {
        type: String,
        trim: true
    },
    lastUpdated: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
});

module.exports = {ManoObra};
