const App = require("./src/index");
const streetHolesRoutes = require("./src/routes/streetHoles.routes");

class Server {
  constructor() {
    this.app = App.express;
    this.streetHolesRoutes = streetHolesRoutes(this.app);
  }
}
module.exports = new Server();
