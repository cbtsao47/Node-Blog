function upperCase(req, res, next) {
  const { name } = req.body;
  if (name.charAt(0).toUpperCase() !== name.charAt(0)) {
    req.body.name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  }
  next();
}

module.exports = upperCase;
