const express = require("express");
const app = express(); // create an express application
const mongoose = require("mongoose");


const { MONGODB } = require("./database");
const userRoutes = require('./routes/user');
const sitesRoutes = require('./routes/sites');
const checklistRoutes = require("./routes/checklist");
const projectRoutes = require("./routes/project");
const auth = require('./middleware/auth');

app.use(express.json())



const port = 1337;


app.use('/app', express.static(__dirname+ '/hackerTasksDesign'));


app.use((req,res,next)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    res.set("Access-Control-Allow-Methods", "POST, GET");
    res.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.set('Cache-Control', 'no-store');
    next();
})



app.use("/authTest", auth, (req,res)=>{
    res.json({
        message: `Welcome ${req.user.email}`
    })
})
app.use('/api/users', userRoutes);
app.use('/api/sites', sitesRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/project', projectRoutes);




app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        "error": {
            "msg": err.message
        }
    });
})

app.use((req,res,next)=>{
    const err = {
        "error": {
            "msg": "404 Not Found"
        }
    }
    res.status(404).json(err); 
})



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