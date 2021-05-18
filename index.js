const http = require('http');
const fs  = require('fs')
var requests = require ('requests')
const homefile = fs.readFileSync('home.html','utf-8')
const replaceVal=(tempVal,orgVal)=>{
    let temperature =tempVal.replace('{%tempval%}',orgVal.main.temp)
    temperature =temperature.replace('{%tempmin%}',orgVal.main.temp_min)
    temperature =temperature.replace('{%tempmax%}',orgVal.main.temp_max)
    temperature =temperature.replace('{%location%}',orgVal.name)
    temperature =temperature.replace('{%country%}',orgVal.sys.country)
    return temperature

}
const server = http.createServer((req,res)=>{
    if (req.url== '/'){
        requests('http://api.openweathermap.org/data/2.5/weather?q=agra&appid=80ddd0b9b69c9d65a0931d56584aab7e')
            .on('data',(chunk) => {
                const objdata=JSON.parse(chunk);
                const arrData=[objdata]
                // console.log(arrData[0].main.temp)
                const realTimeData=arrData
                .map((val)=>
                    replaceVal(homefile,val)).join("")
                    res.write(realTimeData)
                    console.log(realTimeData)
                
            })
            .on ('end',(err)=>{
                if (err) return console.log('connection closed')
                res.end();
            })
    }

})
server.listen(3000,'0.0.0.0')