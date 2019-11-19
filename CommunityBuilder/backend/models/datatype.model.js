const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datatype = new Schema({
    datatypeName: {
        type: String,
        required : true
    },
    datatypeField:{
        type: String,
        required : true
    }
},
{
    timestamps: true,
});

const Datatype = mongoose.model('Datatype', datatype);

module.exports = Datatype;