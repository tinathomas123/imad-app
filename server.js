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

/*var articleOne={
        title: 'Article One',
        header: 'Article One',
        content: 'This is my first article.'
    };*/

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
                <div>
                    Comments: <br />
                    <input type="text" id="comments" />
                    <input type="submit" id="commentsButton" />
                </div>
                <div id="display">
                </div>
                <script type="text/javascript" src="/ui/main.js">
                </script>
            </body>
        </html>`;
        
    return htmlTemplate;
    
    
}

var comments=[];
var comment=document.getElementById('comments');
var commentContent=comment.value;
app.get('/:articleName', function (req, res) {
  
  var articleName=req.params.articleName;
  comments.push(commentContent);
  res.send(createHtmlTemplate(articles[articleName])+JSON.stringify(comments));
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});






// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
