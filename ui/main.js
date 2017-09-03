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
                var comments=request.responseText;
                alert(comments);
                var content=comments.getElementById('display').value;
                JSON.parse(content);
                
                alert(content);
                var displayContent='';
                for(var i=0;i<comments.length;i++){
                    displayContent+='<br/>'+comments[i];
                }
                
                var display=document.getElementById('display');
                display.innerHTML=displayContent;
            }
        }
        
        
    };
    
    var username=document.getElementById('username');
    var password=document.getElementById('password');
    
    request.open('POST',"http://christinethomas221.imad.hasura-app.io/reg");
    request.send(JSON.stringify({username:'username',password:'password'}));
    
    
};