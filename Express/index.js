const express = require('express');
const passport = require('passport');
const AuthRoutes = require ('./routes/auth.js');
const CartRoutes = require ('./routes/cart.js');
const mysql = require ('mysql');
// import { nextTick } from 'process';
var bodyParser = require('body-parser');
const passport_middleware = require ('./controllers/Passport.js');
require('dotenv').config();

// const session = require('express-session');
var pool = require ('./controllers/db_conn.js');

var cors = require ('cors');
const secureRoutes = require ('./routes/secure-routes.js');
const ProductRoutes = require ('./routes/ProductRoutes.js');
const fs  = require ('fs');


const server = express(), PORT = process.env.PORT;
server.use(passport.initialize());
// pool.getConnection()
// server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

const axios = require('axios');
server.get('/txt_response', async (req, res) => {
  const resp = await axios.get('https://teozax.github.io/Data/images_urls.json');
  // const textResp = await resp.text();
  res.json({urls:resp.data});
});

// server.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// );
// server.use(passport.session());

passport_middleware(passport);

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

server.use(cors(corsOptions));

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", process.env.app_url);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//   res.header("Access-Control-Allow-Credentials", true);
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }
//   next();
// });

server.get('/test',
  (req, res, next) =>{
    const products = pool.query('SELECT * FROM products',
    (error, results, fields) => {
      if (error || results.length<=0) return res.json({success:false,errors:['Problem. Please, try again...']});
      // console.log(results);
      return res.json({
        success: true,
        products: results
      })
    });
  }
);

server.use('',  CartRoutes);
server.use('',  ProductRoutes);
server.use('', AuthRoutes);
// Plug in the JWT strategy as a middleware so only verified users can access this route.
server.use('/user', passport.authenticate('jwt', { session: false }),secureRoutes);

// connection.end((err) => {
  
// });
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));