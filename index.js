const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require("express-flash");
const cookieParser = require('cookie-parser');
const session = require('express-session');
require("dotenv").config();

const database = require("./config/database");
database.connect();

const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

app.set("views", "./views");
app.set("view engine", "pug");

// Flash
app.use(cookieParser("luli"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// EndFlash

//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

//Route
routeAdmin(app);
route(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
