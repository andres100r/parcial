
const express = require ('express');
const appServer = express();
const thePandemia = require ('./pandemia');
const pais = require ('./pais');

appServer.listen (3000, ()=>{
    console.log('SERVER IS RUNNING ON PORT 3000');
   });

appServer.use(express.json());  

   appServer.get ('/pandemia',
   (req, res) => {
     res.json(thePandemia);
   }
  );

   appServer.post ('/addpandemia', 
    (req, res)=> {
     const pandemia = req.body;
     thePandemia.push(pandemia);
     res.send('Post pandemia add');
 });

  

appServer.put ('/putpandemia',
 (req, res) => {
 res.send ('THIS IS A PUT REQUEST');
 });