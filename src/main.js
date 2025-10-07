import "dotenv/config";
import { connectDB } from "./application/database.js";
import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

// koneksi ke database
connectDB();

web.listen(300, () => {
  logger.info("Server is running on port 300");
});
