const hasName = function(req, res, next) {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ message: "please include a name" });
  }
};
const capitalizeUserName = function(req, res, next) {
  const { name } = req.body;
  if (name[0] === name[0].toUpperCase()) {
    next();
  } else {
    req.body.name = `${name[0].toUpperCase()}${name.slice(1)}`;
    next();
  }
};

module.exports = {
  hasName,
  capitalizeUserName
};

// ES 6
// import something from 'something';
// const something = require('something')

// export default something;
// module.exports = something
// export something;
// module.exports = {
//     something,
//     something,
//     .
//     .
//     .
// }
