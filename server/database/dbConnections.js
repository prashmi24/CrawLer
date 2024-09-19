import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "JOB_SEARCH",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to the database: ${process.env.MONGO_URI}`);
    })
    .catch((err) => {
      console.error("Database connection error:", err.message);
      process.exit(1);
    });
};
