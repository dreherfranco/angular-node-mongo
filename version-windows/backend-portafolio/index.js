'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/portafolio", { useUnifiedTopology: true, useNewUrlParser: true})
        .then(() =>{
            console.log("bd conectada correctamente");
            //Creacion del servidor
            app.listen(port, () => {
                console.log("Servidor ejecutandose en el puerto 3700");
            });
        
        })
        .catch(err => console.log(err));
