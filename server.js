var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    username:'christinethomas221',
    database:'christinethomas221',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var crypto=require('crypto');
var bodyParser=require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

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

var pool=new Pool(config);

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2Sync','10000',salt,hashed.toString('hex')].join('$');
}

app.post('/reg',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    var salt=crypto.randomBytes(128).toString('hex');
    
    var dbString=hash(password,salt);
    
    pool.query('INSERT INTO user (username,password) VALUES ($1,$2)',[username,dbString], function(err,res){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send('user successfully created: '+username);
       }
       
        
    });
    
    
});


/*function createHtmlTemplate(data){
    
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

app.get('/:articleName', function (req, res) {
  var articleName=req.params.articleName;
  //var comment=req.query.comment;
  //comments.push(comment);
  res.send(createHtmlTemplate(articles[articleName]));
});
*/

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
