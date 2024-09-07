//copilot write mongodb commands to populate mongodb ITEM model 
const mongoose = require('mongoose');
const Item = require('./models/ItemModel');

// Connect to your MongoDB database
mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected...');
  insertDummyData(); // Call the function to insert data after connection is established
}).catch(err => console.error(err));

// Function to generate and insert dummy data
const insertDummyData = async () => {
  try {

    //code to remove all items from the database (for refresh)
    await Item.deleteMany({});
    console.log('All items removed from the database!');

    const items = [
      { id: '1', name: 'Chicken Shawarma', price: 250, cost: 200, sales: 0, category: 'Shawarma', imageUrl: '' },
     
    ];

    await Item.insertMany(items);
    console.log('MenuItems inserted successfully!');
    mongoose.connection.close(); // Close the connection after insertion
  } catch (error) {
    console.error('Error inserting MenuItems:', error);
  }
};
