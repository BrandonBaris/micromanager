const express = require("express");
const serveStatic = require("serve-static");
const api = require("./api");

module.exports = (PORT) => {
  const app = express();
  app.use(serveStatic(__dirname+"/../build"));
  app.use('/api',api);
  app.listen(PORT, ()=> console.log(`API listening on port ${PORT} via proxy`));
};
