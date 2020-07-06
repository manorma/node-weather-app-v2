const request = require('request')

const forecast = (longitude,latitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=449416f72a8930ab2b0096a9ee8552b8&query='+latitude +','+longitude+'&units=m'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('unable to connect to forecast service!',undefined)
        }
        else if(body.error){
            callback('unable to find location!'+body.error.info,undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + ' It is currently '+body.current.temperature + ' degree out. It feels like '+body.current.feelslike + ' degree out.')
        }
    })

}
module.exports= forecast