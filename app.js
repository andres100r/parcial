const express = require ('express');
const appServer = express();
const myPandemia = require ('./pandemia');
const myInformacion = require ('./informacion');
const myPais = require('./pais');


appServer.listen (3000, ()=>{
    console.log('SERVER IS RUNNING ON PORT 3000');
   });

appServer.use(express.json());
appServer.get ('/pandemia', (req, res)=>{
    res.json (myPandemia);
   });
   // ver todas las pandemias
   appServer.get ('/allPandemia', (req, res)=>{                    
    res.json (pandemia);
  });
//agregar pandemia
   appServer.post ('/addpandemia' , (req, res)=>{
    const usuario = req.body;
    myPandemia.push(usuario);
   });


//ver todas los paises por id 
appServer.get ('/allPais', (req, res)=>{                    
  res.json (myPais);
});
//agregar Pais
appServer.post ('/addPais' , (req, res)=>{                 
  const usuario = req.body;
  myPais.push(usuario);
});
//leer o ver pais por id
appServer.get('/readPais/:id', (req, res)=>{          
  
  var index = myPais.findIndex(function(idPais){
      return idPais.idPais === req.params.id; 
  });
  res.json (myPais[index]);
});

//Actualiza pais por id
appServer.post ('/updatePais/:id' , (req, res)=>{      
  const usuario = req.body;
  var index = myPais.findIndex(function(idPais){
      return idPais.idPais === req.params.id;
  });
  myPais.splice(index,1);
  myPais.push(usuario);
});

 //Consultar Information por Id de pandemia

appServer.get('/readInformation/:id', (req, res)=>{         
    
  var index = myinformation.filter(function(idInformation){
      return idInformation.idPandemia === req.params.id ;
  });
  res.json (index);
});

//Consultar datos generales
appServer.get ('/readInformation/:id' , (req, res)=>{    
  
  var index = myinformacion.findIndex(function(idPandemia){
      return idPandemia.idPandemia === req.params.id;
  }); 
  
  var cantidad = myInformacion.filter(function(idInformacion){
      return idInformacion.idPandemia === req.params.id ;
  });
  
  var noPais = cantidad.length , noInfe = 0 , noMuer = 0, noRecp = 0 , namePaisA = "" ;

  for (let i = 0; i < cantidad.length ; i++) {
      var index = myPais.findIndex(function(idPais){
          return idPais.idPais === cantidad[i].idPais;
      });
      namePaisA = namePaisA + " " + pais [index].namePais ;    
  }
  for (let i = 0; i < noPais ; i++) {
      noInfe = parseInt(noInfe) + parseInt(cantidad[i].numeroInfectados) ;
      noMuer = parseInt(noMuer) + parseInt(cantidad[i].numeroMuertos) ;
      noRecp = parseInt(noRecp) + parseInt(cantidad[i].numeroRecuperados) ;
  }
  res.json (myPandemia[index].idPandemia + " "  + myPandemia[index].nameVirus + " " + myPandemia[index].symptom + " "  + myPandemia[index].recommendation 
            + " total Infectados: " + noInfe + ", total Muertos: " + noMuer + ", total Recuperados: " + noRecp + " " + namePaisA );
});

//Curar un pais por id
appServer.get ('/cureCountry' , (req, res)=>{    
  var arrayPandemia = myInformacion.filter(function(idInformacion){
      return idInformacion.idPandemia === req.params.idP ;
  });
  for (let i = 0; i < arrayPandemia.length ; i++){
      myPandemia[arrayPandemia[i].idPandemia].inProgress = false ;
  }
  for (let j = 1; j < myInformacion.length; j++) {
      if(myInformacion[j].idPandemia === req.params.idP && myInformacion[j].idPais === req.params.idC){
          myInformacion[j].numeroRecuperados = parseInt(myInformacion[j].numeroRecuperados) + parseInt(myInformacion[j].numeroInfectados);
          myInformacion[j].numeroInfectados = 0;
      }
  }
});