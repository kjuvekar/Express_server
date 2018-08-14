const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

hbs.registerHelper('currentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = req.url +'\t'+req.method+'\t'  + now + '\n';
    fs.appendFile('log.txt',log,(err)=>{
       if(err){ console.log("Problem while Logging it!");}
    });
    console.log(log);
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname +'/public'));

app.get('/',(req ,res )=> {
    res.render('home.hbs',{
        pageTitle:'Home',
        message:'Hey There!!! Welcome Folks....'
    });
    // res.send("Hello express! It's Node here! ");
});

app.get('/json',(req, res )=>{
    res.send({
        name:'Darth vador',
        'job description': 'Be badass! And be awesome!' 
    });
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
    // res.send('about page!');
});

app.get('/bad',(req,res) => {
    res.send({errorMessage:'Something went wrong!'});
});


app.listen(3000,()=>{
    console.log("server started on port 3000!!! Go to http://localhost:3000")
});