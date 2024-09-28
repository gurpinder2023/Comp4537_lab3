const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const {getDate} = require('./modules/utils');
const {message} = require('./lang/en/en');
const port = process.env.PORT || 3000;


// Function to append text into the file
const writeFile = (filepath, text) => {
    fs.appendFile(filepath, text + '\n', err => {
        if(err){
            console.log('Error writing to file');
        }
    });
}

// Function to read from the file
const readFile = (filepath, res) => {
    fs.readFile(filepath, 'utf8', (err, data) =>{
        if(err){
            res.writeHead(404, {'Content-Type' : 'text/html'});
            res.end(`<div style="color:red; font-size: 20px"> 404 File not found: ${filepath}</div>`);
            return;
        }
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(`<div style="color:blue; font-size: 20px">${data}</div>`);
    });
};

const server = http.createServer((req,res) => {
    const query = url.parse(req.url,true).query;
    const pathname = url.parse(req.url, true ).pathname;
    
    const fileName = path.basename(pathname);
    const filePath = `./${fileName}`;

    if(req.url.startsWith('/getDate')){
        const name = query.name || 'Guest';
        const date = getDate();
        const msg = message.replace('%1',name).replace('%2',date);

        res.writeHead(200, {'Content-type':'text/html'});
        res.end(`<div style = "color:blue; font-size: 20px"> ${msg} </div>`);

    }
    else if(req.url.startsWith('/writeFile')){
        const text = query.text || '';
        writeFile('./file.txt', text);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<div style="color:blue; font-size: 20px">Text appended: ${text}</div>`);
    }
    else if(req.url.startsWith('/readFile')){
        readFile(filePath, res);
    }

    else{
        res.writeHead(404, {'Content-type':'text/html'});
        res.end(`<div style = "color:red; font-size: 20px"> Invalid Request </div>`);
    }
    
    
});

server.listen(port, () =>{
    console.log('Server is running on port 3000');
})
