var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    
    articleOne:{
        title: 'Article One',
        header: 'Article One',
        content: 'This is my first article.'
    },
    
    articleTwo:{
        title: 'Article Two',
        header: 'Article Two',
        content: 'This is my second article.'
    },
    
    articleThree:{
        title: 'Article Three',
        header: 'Article Three',
        content: 'This is my third article.'
    }
};

function createHtmlTemplate(data){
    
    var title=data.title;
    var content=data.content;
    var header=data.header;
    
    var htmlTemplate=
        
        `
        <html>
            <header>
                <title>
                    ${title}
                </title>
            </header>
            <body>
                ${header}
                <div>
                    ${content}
                </div>
            </body>
        </html>
        
        
        `;
        
    return htmlTemplate;
    
    
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:articleName', function (req, res) {
  
  var articleName=req.params.articleName;
  res.send(createHtmlTemplate(articles[articleName]));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
