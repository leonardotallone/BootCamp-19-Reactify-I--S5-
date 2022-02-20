function checkAuth(req, res, next) {
  const access_token = req.cookies["access_token"];

  if (!access_token)
    return res.status(401).send({ message: "missing auth token" });

  req.access_token = access_token;
  next();
}

module.exports = {
  checkAuth,
};
