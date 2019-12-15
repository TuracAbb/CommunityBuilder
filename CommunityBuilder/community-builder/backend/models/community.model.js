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
    dataTypes:{
        type:[{
            datatypeID:{
                type: String,
                required : false
            },
            datatypeName: {
                type: String,
                required : false
            },
            datatypeField:{
                type:[{
                    name :{
                        type: String,
                        required: true
                    },
                    type : {
                        type: String,
                        required: true
                    },
                    required: {
                        type:String, 
                        required:true
                    }  
                }],
                required: false
            },
            
        }]
    },
    posts:{
        type:[{
            name :{
                type: String,
                required: true
            },
            value : {
                type: String,
                required: true
            }
        }],
        required: false
    },
    communityTags :{
        type:[],
        required:false
    }
},
{
    timestamps: true,
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;