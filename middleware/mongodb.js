// import mongoose from 'mongoose';
const mongoose=require('mongoose')

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState==1 || mongoose.connections[0].readyState==2) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection

    await mongoose.connect(process.env.mongoUrl, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    });
    return handler(req, res);
};

export default connectDB;