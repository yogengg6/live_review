const mongoose = require('mongoose');

const connectDB = async ()=>{
    const uri = process.env.DB_CREAD;
    try {
        await mongoose.connect(uri,{});
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Fails to connect DB :', error);
        process.exit(1);
    }
}
module.exports = { connectDB }