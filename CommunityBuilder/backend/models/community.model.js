const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
    communityName: {
        type: String,
        required : true
    },
    communityDescription:{
        type: String,
        required : true
    },
    communityDataTypes :{
        type:String,
        required:true
    },
    communityTags :{
        type:String,
        required:false
    }
},
{
    timestamps: true,
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;