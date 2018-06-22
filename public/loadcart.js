var r="";
window.onload=function()
{

    
          setTimeout(function(){
   
            document.getElementById('loading').style.visibility="hidden"

      }, 800);

    function loadJSON()
   {
   var xobj = new XMLHttpRequest();
           xobj.overrideMimeType("application/json");
       xobj.open('GET', '/cart.json', true); // Replace 'my_data' with the path to your file
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
       
       }
       else{
           console.log(loadJSON());
           setTimeout(function(){
   
        check();
           }, 800); 
         }
        } 
       check();
       function work(){
          var total=0;
            var table=document.getElementById("table");
             var t=JSON.parse(loadJSON());
             for(let x=0;x<t.length;x++)
             {
             var tr=document.createElement("tr");
             var th1=document.createElement("th");
             th1.innerText=t[x]["Name"];
             var th2=document.createElement("th");
             th2.innerText=t[x]["Price"];
             var th3=document.createElement("th");
             th3.innerText=t[x]["Count"];

             tr.appendChild(th1);
             tr.appendChild(th2);
             tr.appendChild(th3);

             table.appendChild(tr);
             total=total+parseInt(t[x]["Price"])*parseInt(t[x]["Count"]);

             }

            var table=document.getElementById("total");
            table.innerHTML="Your Total"+"&nbsp"+"&nbsp"+total;

            
            }
            
            }
        