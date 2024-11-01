const request= require('request')

const forecast=(address,callback)=>{
    const url='https://api.weatherapi.com/v1/forecast.json?key=55d0e9b570fd41518ce143343242210&q='+encodeURIComponent(address)+'&days=1&aqi=no&alerts=no'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect",undefined)
        }
        else if(body.error){
            callback("wrong location",undefined)
        }
        else{
            callback(undefined,"it's currently "+body.current.temp_c+" degrees in "+address+" and There is a "+body.current.precip_mm+" chance of rain."+body.forecast.forecastday[0].astro.moon_phase)
        }
    })
}

module.exports=forecast