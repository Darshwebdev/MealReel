const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    },
    likeCount: {
        type: Number,
        default: 0
    },
    price:{
        type:Number,
        required:true,
        min: 0   // price can't be negative
    },
    savesCount: {
        type: Number,
        default: 0
    },
    category:{
        type: String,
        required:true
    }
})


const foodModel = mongoose.model("food", foodSchema);


module.exports = foodModel;