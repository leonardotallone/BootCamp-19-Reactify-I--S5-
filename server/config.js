const dotenv = require("dotenv");

dotenv.config();
const requiredEnvs = ["CLIENT_ID", "CLIENT_SECRET", "REDIRECT_URI"];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) throw new Error(`Missing env variable ${env}`);
});

module.exports = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
};
