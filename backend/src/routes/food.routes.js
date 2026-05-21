const express = require('express');
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();
const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage(),
})


/* POST /api/food/ [protected]*/
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("mama"),
    foodController.createFood)


/* GET /api/food/ [protected] */
router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems)

    /* GET /api/food/:id  [Protected] */
// router.get(
//   "/:id",
//   authMiddleware.authUserMiddleware,
//   async (req, res) => {
//     try {
//       const food = await require("../models/food.model").findById(req.params.id);

//       if (!food) {
//         return res.status(404).json({ message: "Food not found" });
//       }

//       res.status(200).json({
//         _id: food._id,
//         name: food.name,
//         price: food.price,
//         video: food.video,
//         description: food.description,
//       });
//     } catch (err) {
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// );

router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood)


router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)


router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
)

router.get("/:category",
    foodController.findbycategory
);


module.exports = router