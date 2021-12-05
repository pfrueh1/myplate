const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');
const PORT = process.env.PORT || 3001;
const routes = require('./controllers')

//init app
const app = express();

const sequelize = require('./config/connection');

const session = require('express-session');
const { Z_FILTERED } = require('zlib');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// public folder
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(require('./controllers/'));
app.use(routes);
// set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');

// moved to utils/checkFileType
// // check File Type
// function checkFileType(file, cb){
//     //allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     //check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname){
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

// app.get('/', (req, res) => res.render('./layouts/main.handlebars'));

app.post('/upload', (req, res) => {  
    upload(req, res, (err) => {
        if(err) {
            res.render('dashboard', {
                msg: err,
                style: feed.css
            });
        }else {
            if(req.file == undefined){
                res.render('dashboard', {
                    msg: 'Error: No File Selected!',
                    style: feed.css
                });
            } else {
                res.render('dashboard', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`,
                    style: feed.css
                });
            }
        }
    });
});

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
});