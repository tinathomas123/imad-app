console.log('Loaded!');

alert('inside main.js');

var commentsButton=document.getElementById('commentsButton');
commentsButton.onclick=function(){
    alert('hi');
    var comment=document.getElementById('comments');
    var commentContent=comment.value;
    
    
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                var comments=request.responseText;
                JSON.parse(comments);
                var displayContent='';
                for(var i=0;i<comments.length;i++){
                    displayContent+='<br/>'+comments[i];
                }
                
                var display=document.getElementById('display');
                display.innerHTML=displayContent;
            }
        }
        
        
    };
    
    request.open('GET',"http://christinethomas221.imad.hasura-app.io/articleOne");
    request.send(null);
    
    
};