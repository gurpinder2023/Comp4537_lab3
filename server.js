const http = require('http');
const url = require('url');
const {getDate} = require('./modules/utils');
const {message} = require('./lang/en/en');

const server = http.createServer((req,res) => {
    const query = url.parse(req.url,true).query;

    if(req.url.startsWith('/getDate')){
        const name = query.name || 'Guest';
        const date = getDate();
        const msg = message.replace('%1',name).replace('%2',date);

        res.writeHead(200, {'Content-type':'text/html'});
        res.end(`<div style = "color:blue"> ${msg} </div>`);

    }
    else{
        res.writeHead(404, {'Content-type':'text/html'});
        res.end(`<div style = "color:red"> Invalid Request </div>`);
    }
    
    
});

server.listen(3000, () =>{
    console.log('Server is running on port 3000');
})