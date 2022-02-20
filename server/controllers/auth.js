const qs = require("qs");

const AuthService = require("../services/auth");
const { generateRandomString } = require("../utils");
const config = require("../config");
const scopes = require("./scopes");

const stateKey = "spotify_auth_state";
const token = "access_token";
const refresh = "refresh_token";

class AuthController {
  static async me(req, res) {
    const access_token = req.cookies[token];

    if (!access_token) {
      return res.sendStatus(401);
    }

    const { error, data } = await AuthService.me(access_token);

    if (error) {
      return res.status(data.status || 403).send({ message: data.message });
    }

    res.send(data);
  }

  static login(req, res) {
    const { client_id, redirect_uri } = config;

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        qs.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scopes.join(" "),
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  }

  static async authCallback(req, res) {
    const { redirect_uri } = config;
    const { code = null, state = null } = req.query;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      return res.redirect(
        "http://localhost:3000/error?" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    }

    res.clearCookie(stateKey);

    const { error, data } = await AuthService.generateToken({
      params: { code, redirect_uri },
      ...config,
    });

    if (error || !data.access_token) {
      return res.redirect(`http://localhost:3000/error?msg=${data.message}`);
    }

    res.cookie(token, data.access_token);
    res.cookie(refresh, data.refresh_token);

    res.redirect("http://localhost:3000/");
  }

  static async refreshToken(req, res) {
    const refresh_token = req.body.refresh_token;

    if (!refresh_token) return res.status(400).send("Missing refresh_token");

    const { error, data } = await AuthService.generateToken({
      params: { refresh_token },
      ...config,
    });

    if (error) {
      return res.status(data.status || 403).send({ message: data.message });
    }

    res.send(data);
  }
}

module.exports = AuthController;
