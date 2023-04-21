const makeAuthAction = require("./auth.js");

const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =    "981007241612-0m9s0h2vds14cfg7ebq2rskmmrr6sbro.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authAction = makeAuthAction({ client });

module.exports = {
  authAction,
};
