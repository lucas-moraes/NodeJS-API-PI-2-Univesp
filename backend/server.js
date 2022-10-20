const App = require("./src/index");
const streetHolesRoutes = require("./src/routes/streetHoles.routes");

class Server {
  constructor() {
    this.app = App.express;
    this.streetHolesRoutes = streetHolesRoutes(this.app);
    this.checkApp();
  }

  checkApp() {
    this.app.get("/checkHealth", (req, res) => {
      return res.json({ message: "API It's running !!!" });
    });
  }
}
module.exports = new Server();
