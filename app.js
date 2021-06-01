const express = require("express");
const app = express(); // create an express application
const mongoose = require("mongoose");


const { MONGODB } = require("./database");
const userRoutes = require('./routes/user');
const sitesRoutes = require('./routes/sites');
app.use(express.json())



const port = 1337;



app.use('/api/users', userRoutes);
app.use('/api/sites', sitesRoutes);


mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        ()=>{
            console.log("connected to mongodb");
            return app.listen(port);
        }
    )
    .then(
        () => {
            console.log(`server running at port ${port}`)
        }
    )
    .catch(
        err=>{
            console.log(err.message)
        }
    );