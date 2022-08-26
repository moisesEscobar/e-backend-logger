const mongooses = require("mongoose");

const AuthorizationSchema =  mongooses.Schema({
    application_id: {
        type: mongooses.Schema.Types.ObjectId,  
        ref: 'aplications',
        required: true,
    },
    token:{
        type: String,
        required: true,
        default: null
    }
},{
    collection: 'autohorizations',
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false
});
module.exports = mongooses.model("Authorization",AuthorizationSchema);