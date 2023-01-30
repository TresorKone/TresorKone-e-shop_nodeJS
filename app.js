//import
const path = require("path");
//import

//third-party package import
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MariaDBStore = require('express-session-mariadb-store');
const csrf = require('csurf');
const { flash } = require('express-flash-message');
const fileUpload = require('express-fileupload');
const nunjucks = require('nunjucks')
//third-party package import

//imports of my own files
const userRoutes = require('./src/routes/user');
const adminRoutes = require('./src/routes/admin');
const authRoutes = require('./src/routes/auth');


//imports of my own files

const app = express();

//templating engine setup
app.set('view engine', 'njk');
app.set('views', 'views');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
//body-parser for mixed data(in my case i will use it for file parsing in my form)
app.use(fileUpload());
//this will allow me to serve static file
app.use(express.static(path.join(__dirname, 'public')));
//mariaDbStore

const csrfSetup= csrf();

//session
app.use(session({
    secret: 'secret keyword',
    resave: false,
    saveUninitialized: false,
    store: new MariaDBStore({
        user: 'root',
        password: 'databasesql',
        database: 'e-shop_nodejs',
        sessionTable: 'session',
        host: 'localhost',
        connectionLimit: 5
    })
}));

app.use(csrfSetup);
app.use(flash({ sessionKeyName: 'flashMessage', useCookieSession: true }));

//locals variable
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    res.locals.session = req.session;

    next();
});


//routes
app.use(adminRoutes);
app.use(userRoutes);
app.use(authRoutes);

app.listen(5000)

