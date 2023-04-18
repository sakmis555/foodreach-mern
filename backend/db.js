// Import mongoose
const mongoose = require("mongoose");
// Variable for storing the Atlas database address
//

const mongoDB = async () => {
  console.log(process.env.URI);
  await mongoose.connect(
    "mongodb://FoodReach:Saksham1234@ac-yzjzpam-shard-00-00.hhhmnlw.mongodb.net:27017,ac-yzjzpam-shard-00-01.hhhmnlw.mongodb.net:27017,ac-yzjzpam-shard-00-02.hhhmnlw.mongodb.net:27017/foodreachmern?ssl=true&replicaSet=atlas-uk4h61-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewURLParser: true },
    async (err, result) => {
      if (err) {
        console.log("---", err);
        console.log("if part is executing");
      } else {
        console.log("connected to mongoDB");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function(err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "foodCategory"
          );
          foodCategory.find({}).toArray(function(err, category_data) {
            if (err) console.log(err);
            else {
              global.food_items = data;
              global.foodCategory = category_data;
            }
          });
        });
      }
    }
  );
};

module.exports = mongoDB;
