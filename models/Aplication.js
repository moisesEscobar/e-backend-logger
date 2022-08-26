const mongooses = require("mongoose");

const AplicationSchema =  mongooses.Schema({
    name:{
        type: String,
        required: true,
        default: null
    }
},{
    collection: 'aplications',
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false
});
module.exports = mongooses.model("Aplication",AplicationSchema);