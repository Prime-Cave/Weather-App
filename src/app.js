const path = require('path');
const express =require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port= process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title:'weather App',
        name: 'Tomisin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help Page',
        title: 'Help',
        name: 'Tomisin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name:'Tomisin'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Error!, Please Provide an Address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            } else {
                forecast(latitude, longitude, (error, forcastData) => {
                    if (error) {
                        return res.send({
                            error: error
                        })
                    }
                    res.send({
                        location: location,
                        forecast: forcastData
                    })
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        response: 'Help Article not found',
        name: 'Tomisin'
    })
})

app.get('*', (req, res) => {
    res.render('404page',{
        response: 'My 404 page not found',
        name: 'Tomisin'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})