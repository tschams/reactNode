// The dotenv node_module should be the first imported/configured in the app.
require("dotenv-flow").config();

// Import variables from the environment and your ".env" files.

let {
  API_DOCS_PATH = "/api-docs",
  API_DOMAIN = "localhost",
  API_PATH = "/",
  API_PORT,
  API_SCHEME = "http",

  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,

  NODE_ENV = "development",
} = process.env;

/** True if in development mode. */
const __DEV__ = NODE_ENV === "development";
// Ensure NODE_ENV is set on process.env.
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = NODE_ENV;
}
// - Parse any variables that are used as numbers.
// - Format any strings that need formatting.
DB_PORT = parseInt(DB_PORT);
API_PORT = parseInt(API_PORT);

export const SITE_URL = `${API_SCHEME}://${API_DOMAIN}:${API_PORT}`;
export const API_URL = `${SITE_URL}${API_PATH}`;
export const API_DOCS_URL = `${SITE_URL}${API_DOCS_PATH}`;

export {
  __DEV__,
  //
  // API
  //
  API_DOCS_PATH,
  API_DOMAIN,
  API_PATH,
  API_PORT,
  API_SCHEME,
  //
  // Database
  //
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  //
  NODE_ENV,
};
