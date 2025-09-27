const app = require("./src/app");
const connectDB = require("./src/config/database");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.log("UNHANDLED REJECTION! Shutting down...");
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
