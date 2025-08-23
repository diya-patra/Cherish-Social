import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "cherishSocialDB",
        });

        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};
