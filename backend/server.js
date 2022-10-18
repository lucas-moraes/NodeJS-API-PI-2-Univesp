const App = require("./src/index");
const streetHolesRoutes = require("./src/routes/streetHoles.routes");
const externalRoutes = require("./src/routes/external.routes");

class Server {
  constructor() {
    this.app = App.express;
    this.streetHolesRoutes = streetHolesRoutes(this.app);
    this.externalRoutes = externalRoutes(this.app);
    this.checkApp();
  }

  checkApp() {
    this.app.get("/checkHealth", (req, res) => {
      res.json({ message: "API It's running !!!" });
    });
  }
}
module.exports = new Server();
