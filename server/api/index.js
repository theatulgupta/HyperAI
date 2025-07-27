import app from "../server/app.js";
import serverless from "serverless-http";

export const handler = serverless(app);
