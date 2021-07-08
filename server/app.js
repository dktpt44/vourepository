const express = require('express');
const cp = require('child_process');

const port = 5000;
const app = express();

var responseVal = {
    "resname":"message from server",
    "imgLoc":"./logo192.png"
}

const exec_options = {
    cwd:null,
    env: null,
    encoding: 'utf8',
    timeout:0,
    maxBuffer: 200*1024,
    killSignal: 'SIGTERM'
};

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.all('/',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin', req.get('origin') || "*");
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.get('/',(req,res,next)=>{
    console.log('get req');
    res.json(responseVal);
});

app.post('/',(req,res,next)=>{
    var firstVal = req.body.firstVal;
    var secondVal = req.body.secondVal;
    var modeS = req.body.modeS ?'--mode s':'';
    var command = 'voublazars --ra '+firstVal+' --dec '+secondVal+' '+modeS;
    console.log(command);
    // creates a new thread
    cp.exec( 'ls -l', exec_options, (err, stdout,stderr)=> {
        // callback function when the command run is complete
        console.log('exec running');
        console.log(stdout);
        responseVal.ls = stdout;
        res.json(responseVal);
    });
});

app.listen(port,()=>{
    console.log('App listening on port 5000!');
});