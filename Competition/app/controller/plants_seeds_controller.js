const plantSeedModel = require("../../db/models/plants_seeds_model");
const myHelper = require("../helper");
const mongoose = require("mongoose");

class PlantSeed {
  static addPlantOrSeed = async (req, res) => {
    try {
      const plantSeedData = new plantSeedModel(req.body);
      await plantSeedData.save();
      myHelper.sendResponse(res, 200, true, plantSeedData, "added");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static addReview = async (req, res) => {
    try {
      const plantSeedData = await plantSeedModel.findById(
        mongoose.Types.ObjectId(req.params.id)
      ); 
      plantSeedData.reviews.push(req.body.reviews );
      await plantSeedData.save();
      myHelper.sendResponse(res, 200, true, plantSeedData, "added");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static showAllReviewsOfPlantOrSeed=async(req,res)=>{
    try {
        const plantSeedData = await plantSeedModel.findById(
          mongoose.Types.ObjectId(req.params.id)
        );  
        myHelper.sendResponse(res, 200, true, plantSeedData.reviews, "Fetched all reviews successfully");
      } catch (e) {
        myHelper.sendResponse(res, 500, false, e, e.message);
      }
  }

  static searchPlanOrSeed = async (req, res) => {
    try {
      const plantSeedData = await plantSeedModel.find(req.body);
      myHelper.sendResponse(
        res,
        200,
        true,
        plantSeedData,
        "Fetched data successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static searchShopsThatContainSpecificPlanOrSeed = async (req, res) => {
    try {
      const plantSeedData = await plantSeedModel.find(req.body);
      if(!plantSeedData)throw new Error("No such plant or seed found")
      myHelper.sendResponse(
        res,
        200,
        true,
        plantSeedData.shopsThatContainThisPlantOrSeed,
        "Fetched shops successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
}

module.exports = PlantSeed;
