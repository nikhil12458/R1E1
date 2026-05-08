import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { connectDB } from "./src/config/db.js";

const PORT = config.PORT;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
