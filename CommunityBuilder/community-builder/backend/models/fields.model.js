const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
    name :{
        type: String,
        required: true
    },
    primitiveType : {
        type: String,
        required: true
    },
    require: {
        type:String, 
        required:true
    }    
},
{
    timestamps: true,
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;