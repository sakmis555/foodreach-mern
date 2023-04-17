// Import mongoose
const mongoose = require("mongoose");
// Variable for storing the Atlas database address
//

const mongoDB = async () => {
  console.log(process.env.URI);
  await mongoose.connect(
    "mongodb+srv://FoodReach:Saksham1234@cluster0.hhhmnlw.mongodb.net/foodreachmern?retryWrites=true&w=majority",
    { useNewURLParser: true },
    async (err, result) => {
      if (err) {
        console.log("---", err);
        console.log("if part is executing");
      } else {
        console.log("connected");
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
