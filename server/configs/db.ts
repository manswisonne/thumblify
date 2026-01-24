// import mongoose from 'mongoose';
// const connectDB = async () => {
//     try {
//         mongoose.connection.on('connected',()=>console.log('mongodb connected'))
//         await mongoose.connect(process.env.MONGODB_URI as string);
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
     
//     }
// }  
// export default connectDB;
// configs/db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error;
    }
};

export default connectDB;
    