const mongoose = require('mongoose');

// Connection function
const connectDB = async () => {
    try {
        const mongoURI = 'mongodb+srv://meenauppada971:Bhavani@cluster0.ra8pbcv.mongodb.net/foodmern?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();

        global.food_items = fetched_data;
        global.foodCategory = foodCategory;

        console.log("Food Items:", global.food_items);
        console.log("Food Categories:", global.foodCategory);
        
    } catch (error) {
        console.error("Connection to MongoDB failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
