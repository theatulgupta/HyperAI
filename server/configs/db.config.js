import { neon } from "@neondatabase/serverless";
import { env } from "./env.config.js";

const sql = neon(`${env.DATABASE_URL}`);

export default sql;
