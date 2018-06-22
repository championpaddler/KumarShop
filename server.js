var express = require("express");
var app     = express();
var path    = require("path");

var t=[];

app.use(express.static('public'))
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('100.db');
var up=new sqlite3.Database('100.db');
var check;
var r=[];

db.run("CREATE TABLE if not exists Products (Name TEXT, Price INT , Image TEXT,Type TEXT)");
db.run("CREATE TABLE if not exists Cart (Name TEXT, Price INT , Count INT)");

  

  //stmt.finalize();

app.get('/data.json',function(req,res){
  db.all("SELECT * FROM Products",function(err,rows){
    r=rows;
    
    res.send(r);
    
    
});



})
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+"/index1.html"));
})
app.get('/cart',function(req,res){
  res.sendFile(path.join(__dirname+"/cart.html"));
})
app.get('/add',function(req,res){
  res.sendFile(path.join(__dirname+"/Add.html"));
})

app.get('/Admin',function(req,res){
  res.sendFile(path.join(__dirname+"/Admin.html"));
})

app.post('/',function(req,res){
  var t=JSON.parse(req.body.fname);
 if(t.length>0)
  {
  for(var r=0;r<t.length;r++)
  {
  
    let sql = `SELECT COUNT FROM  Cart WHERE Name  = ?`;

    db.serialize(function() 
        {
            
            
  console.log(db.run(("SELECT COUNT FROM  Cart WHERE Name  = ?"),(t[r]["name"])));
            
        })
let playlistId = t[r]["name"];
    
     
     db.get(sql, [playlistId], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  else{
    var ro=row.Count+1;
    console.log(ro);
    let sq = "UPDATE Cart SET COUNT =? WHERE Name  = ?";
    let play = [ro,playlistId];
    up.get(sq, play, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      else{
        console.log("added");
      
  }});}})}}})


  

  
 
app.get('/cart.json',function(req,res){
  db.all("SELECT * FROM Cart",function(err,rows){
     var rw=rows;
    
    res.send(rw);
    
    
});})
app.post('/add',function(req,res){
  var name=req.body.Name;
  var Price=req.body.Price;
  var image=req.body.Url;
 var type="TEts";
  
  db.serialize(function() 
        {
            
            
              db.run("INSERT INTO Products VALUES('"+name+"','"+Price+"','"+image+"','"+type+"')");
            
        })
        db.serialize(function() 
        {
            
            
              db.run("INSERT INTO Cart VALUES('"+name+"','"+Price+"',0)");
            
        })
        res.sendFile(path.join(__dirname+"/added.html"));
      })




  app.listen(process.env.PORT || 5000);

