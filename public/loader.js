var r="";
var cart=[];
var ty;


window.onload=function ()
   { //$('body').hide();
   
   function work()
   {
       $('body').show();
   } 
   function loadJSON()
   {
   var xobj = new XMLHttpRequest();
           xobj.overrideMimeType("application/json");
       xobj.open('GET', '/data.json', true); // Replace 'my_data' with the path to your file
       xobj.onreadystatechange = function () {
             if (xobj.readyState == 4 && xobj.status == "200") {
               // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
               r=xobj.responseText;
           }
            
       }; xobj.send(null); return r;
   }
       function check (){
           if(loadJSON().length>1)
       {
       console.log(loadJSON());
   
       work();
       create();
       }
       else{
           console.log(loadJSON());
           setTimeout(function(){
   
        check();
           }, 800); 
         }
        } 
       check();
    window.cont=this.document.getElementById("cont");

  function create()
  { 
 
     var t=JSON.parse(loadJSON());
     console.log(t);
     console.log(t.length);
    for (let f=0;f<t.length;f++)
    {
        var colsm4 = document.createElement("div");
        colsm4.setAttribute("class","col-sm-4");
        var panel=document.createElement("div");
    panel.setAttribute("class","panel panel-primary")
    var phead=document.createElement("div");
    phead.setAttribute("class","panel-heading");
    phead.innerText=t[f]["Name"];
    var pbody=document.createElement("div");
    pbody.setAttribute("class","panel-body");
    var image=document.createElement("img");
    image.setAttribute("src",t[f]["Image"]);
    image.setAttribute("height","350px");

    //image.setAttribute("class","img-responsive");
    
    image.setAttribute( "style","width:100%");
    pbody.appendChild(image);
    var pfoot=document.createElement("div");
    pfoot.setAttribute("class","panel-footer");
    var text=document.createElement("div");
    text.innerText="Price:"+t[f]["Price"];
    
    pfoot.appendChild(text);
    var butt=document.createElement("button");
    butt.setAttribute("class","button button2");
    butt.setAttribute("id","butt");
    butt.innerText="Add to Cart";
    pfoot.appendChild(butt);
    panel.appendChild(phead);
    panel.appendChild(pbody);
    panel.appendChild(pfoot);
   colsm4.appendChild(panel);
 cont.appendChild(colsm4);
 butt.onclick=function(event)
 {
       
     var Price=event.target.parentElement.children[0].innerText;
     Price=parseInt(Price.slice(6));
     console.log(Price);
     var name=event.target.parentElement.parentElement.children[0].innerText;
     console.log();
     if(cart.length==0)
     {
         cart.push({"name":name,"Price":Price,"count":1});
         console.log(cart);
        
     }
     else
     {
         for(let loo=0;loo<cart.length;loo=loo+1)
     {
        if(cart[loo]["name"]==(name))
        {  
            cart[loo]["count"]=cart[loo]["count"]+1;
            
            console.log(JSON.stringify(cart))
           
        }
        
    }
    ty=false;
    for(let loo=0;loo<cart.length;loo=loo+1)
    {
       if(cart[loo]["name"]==(name))
       {  
           ty=true;
          
       }
       
   }
   if(ty==false){         cart.push({"name":name,"Price":Price,"count":1});
};


}
     

    

var xhr = new XMLHttpRequest();
xhr.open("POST", '/', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here.
    }
}
xhr.send("fname="+JSON.stringify(cart));  
    document.getElementById("myNav").style.width = "100%";
    console.log("working");

    setTimeout(function(){
         document.getElementById("myNav").style.width = "0%";


    
    }, 3000);
    
  
    

   
 
}
 


}
   

   }
   

   

}
   
   