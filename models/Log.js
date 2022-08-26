const mongooses = require("mongoose");

const LogSchema =  mongooses.Schema({
    application_id: {
        type: mongooses.Schema.Types.ObjectId,  
        ref: 'aplications',
        required: true,
    },
    type:{
        type: String,
        required: false,
        default: null
    },
    priority:{
        type: String,
        required: false,
        default: null
    },
    path:{
        type: String,
        required: false,
        default: null
    },
    message:{
        type: mongooses.Schema.Types.Mixed,
        required: false,
        default: null
    },
    request:{
        type: mongooses.Schema.Types.Mixed,
        required: false,
        default: null
    },
    response:{
        type: mongooses.Schema.Types.Mixed,
        required: false,
        default: null
    }
},{
    collection: 'logs',
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false
});
module.exports = mongooses.model("log",LogSchema);