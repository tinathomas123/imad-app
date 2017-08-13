console.log('Loaded!');

alert('inside main.js');

var commentsButton=document.getElementById('commentsButton');
commentsButton.onclick=function(){
    alert('hi');
    var comments=document.getElementById('comments');
    var commentContent=comments.value;
    var display=document.getElementById('display');
    display.innerHTML=commentContent;
    
};