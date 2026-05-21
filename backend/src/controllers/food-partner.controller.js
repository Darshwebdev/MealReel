const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
  try {

    const partnerId = req.params.id;

    // find partner
    const foodPartner = await foodPartnerModel.findById(partnerId);

    if (!foodPartner) {
      return res.status(404).json({
        message: "Food partner not found"
      });
    }

    // find foods uploaded by this partner
    const foods = await foodModel.find({
      foodPartner: partnerId
    }).select("_id video name price category");

    res.status(200).json({
      foodPartner: foodPartner,
      foods: foods,
      totalFoods: foods.length
    });

  } catch (error) {

    // console.log(error);

    res.status(500).json({
      message: "Failed to fetch food partner profile"
    });

  }
}

module.exports = {
    getFoodPartnerById
};