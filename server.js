const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

    const itemRoutes = require('./expressRoutes/itemRoutes');
    const vendingRoutes = require('./expressRoutes/vendingRoutes');
    const stockRoutes = require('./expressRoutes/stockRoutes')
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB).then(
        () => {console.log('Database is connected') },
        err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    app.use(express.static('public'));
    app.use(express.static('./uploads'));
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/items', itemRoutes);
    app.use('/vendings',vendingRoutes);
    app.use('/stocks',stockRoutes)
    const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
        console.log('Listening on port ' + port);
    
    });