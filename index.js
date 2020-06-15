const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");

const app=express();

const vec=[2,4,6,8,10];

//const myinfo=new estructuras()

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.listen(3005,()=>{
console.log("Escuchando en el puerto 3005");

});

app.get("/",cors(),(req,res)=>{   //request response 
res.status(200).send({message:"Bienvenidos ya estamos respondiendo"});
});

app.get("/usuarios/:dato?",cors(),(req,res)=>{
    if(req.params.dato){
        //let res= myinfo.buscar(req.params.dato);
       // if(res!=null)
       let encontrado=-1;
       let i=0;
       while (i<vec.length && encontrado==-1){
           if(vec[i]==parseInt(req.params.dato))
           encontrado=i;
           i++;
       }
       if(encontrado==-1)
          res.status(500).send({tipo:"error",mensaje:"No existe"});
          else
            res.status(200).send({tipo:"exito",mensaje:"hallado" + encontrado});
       
    }
    else
        if(!vec)
            res.status(500).send({tipo:"error",message:"No existe datos"});
    else
        res.status(200).send({message:"Todos",dato:vec});
});

app.post("/usuarios",cors(), (req,res)=>{
    if(!req.body.usuario || !req.body.numero){
        res.status(500).send({tipo:"error",mensaje:"Faltan datos"});

    }
    else{
        let dato=parseInt(req.body.numero);
        let encontrado=-1;
       let i=0;
       while (i<vec.length && encontrado==-1){
           if(vec[i]==parseInt(dato))
           encontrado=i;
           i++;
       }
       if(encontrado==-1){
           vec.push(dato);
           res.status(200).send({tipo:"exito",mensaje:"El dato se agrego correctamente"});

       }
       else
       res.status(500).send({tipo:"error", mensaje:"El dato ya existe"});
    }

});
