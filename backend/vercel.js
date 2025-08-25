import app from "./index.js";
import serverless from "serverless-http";

// 🚀 Export the app instead of listening
export default serverless(app);