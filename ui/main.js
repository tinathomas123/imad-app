console.log('Loaded!');

alert('inside main.js');

var submit=document.getElementById('submit');
submit.onclick=function(){
    //alert('hi');
    //var comment=document.getElementById('comments');
    //var commentContent=comment.value;
    
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                alert('login successful');
            }
            else if(request.status===403){
                alert('Incorrect login credentials');
            }
            else if(request.status===500){
                alert('Internal server error');
            }
        }
        
        
    };
    
    var username=document.getElementById('username');
    var password=document.getElementById('password');
    
    request.open('POST',"http://christinethomas221.imad.hasura-app.io/reg");
    req.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:'username',password:'password'}));
    
    
};