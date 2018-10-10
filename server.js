const express = require('express');
const fs = require('fs')
const hbs = require('hbs');
const app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    let now = new Date().toDateString()
    let log = `Date: ${now} -- Method: ${req.method} -- Url: ${req.url} -- IP: ${req.ip} -- Hostname: ${req.hostname}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append server.log')
        }  
    })
    next()
})

app.use((req,res,next) => {
    res.render('maintenance.hbs')
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});


hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello World</h1>')
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Welcome to this wonderful page!!',
        
        
    })
})
 
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
      
    })
})

app.get('/bad', (req, res) => {
    res.send({
        message: 'BAD_REQUEST'
    })
})

const env_PORT = 3000;

app.listen(env_PORT, ()=>{
    console.log(`Running on port ${env_PORT}`)
});
