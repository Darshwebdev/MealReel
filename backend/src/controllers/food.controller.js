const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const likeModel = require("../models/likes.model")
const saveModel = require("../models/save.model")
const { v4: uuid } = require("uuid")


async function createFood(req, res) {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    const partnerId=req.foodPartner.id;
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id,
        price: req.body.price,
        category : req.body.category,
        foodPartner: partnerId
    })
    // console.log(partnerId);
    
    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })

}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}


async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}

//for finding the category for the food 
async function findbycategory(req,res){
    // console.log(req.params.category);
    
try{const category = req.params.category;


const foods= await foodModel.find({
     category: new RegExp(`^${category}$`, "i")
});
res.status(200).json(foods);
// console.log(foods);

return foods;
}
catch(error){
    res.json(500).json({message:"failed to fetch the category"});
}
}
//food partner profile details 
const getFoodPartnerProfile = async (req, res) => {
  try {

    const partnerId = req.params.id;

    // get partner
    const foodPartner = await foodPartnerModel.findById(partnerId);

    if (!foodPartner) {
      return res.status(404).json({
        message: "Food partner not found"
      });
    }

    // get foods uploaded by partner
    const foods = await foodModel.find({
      foodPartner: partnerId
    }).select("_id video name price category");

    res.status(200).json({
      foodPartner,
      foods,
      totalFoods: foods.length
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message
    });

  }
}
module.exports = {
    findbycategory,
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood,
    getFoodPartnerProfile
}
