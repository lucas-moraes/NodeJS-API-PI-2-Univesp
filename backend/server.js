const App = require("./src/index");
const streetHolesRoutes = require("./src/routes/streetHoles.routes");
const usersRoutes = require("./src/routes/users.routes");

class Server {
  constructor() {
    this.app = App.express;
    this.streetHolesRoutes = streetHolesRoutes(this.app);
    this.usersRoutes = usersRoutes(this.app);
  }
}
module.exports = new Server();
