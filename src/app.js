const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__filename,'../../public'))
console.log(__filename)
const app = express()
const port = process.env.PORT || 3000

//define pathh for express config
const publicDirectory = path.join(__filename,'../../public')
//if you can kepp the hbs file in views directory , no need to add this viewDirectory to app
const viewsDirectory = path.join(__filename,'../../templates/views')
const partialPaths = path.join(__filename,'../../templates/partials')

//set up handlebar and view location
app.set('views',viewsDirectory)
app.set('view engine','hbs')
hbs.registerPartials(partialPaths)

app.use(express.static(publicDirectory))

app.get('',(req,resp) => {
    resp.render('index',{
        title:'Weather App',
        name: 'Manorma Bharti'
    })
})

app.get('/about',(req,resp) => {
    resp.render('about',{
        title : 'About Me',
        name: 'Manorma Bharti'
    })
})

app.get('/help',(req,resp) => {
    resp.render('help',{
        helpText: 'This is my helpful text',
        title:'Help',
        name:'Manorma Bharti'
    })
})

app.get('/weather',(req,resp) => {
    if(!req.query.address){
        return resp.send({
            error:'You must provide address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} ={}) => {
        if(error){
            return resp.send({error})
        }
        forecast(longitude,latitude,(error,{forecastData,weatherIcon} ={}) => {
            resp.send({
                forecastData,
                location,
                address : req.query.address,
                weatherIcon
            })
        })
    })

    // resp.send({
    //     forecast:'It is snowing',
    //     location:'Bangalore',
    //     address : req.query.address
    // })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Manorma Bharti',
        errorMessage : 'Help article not found'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: ' You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products :[]
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Manorma Bharti',
        errorMessage : 'Page not found'
    })
})

// app.get('',(req,resp) => {
//     resp.send('<h1>Hello Express!</h1>')
// })

// app.get('/help',(req,resp)=>{
//     resp.send([{
//         name :'Manorma'
//     },{
//         name : 'Anand'
//     }])
// })

// app.get('/about',(req,resp) => {
//     resp.send('<h1>About Page!</h1>')
// })
// app.get('/weather',(req,resp) => {
//     resp.send({
//         forecast : 'It is snowing',
//         location:'Bangalore'
//     },
//     )
// })

//app.com
//app.com/help
//app.com/about

app.listen(port,() => {
    console.log('Server is up on port ' +port)
})
