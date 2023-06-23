let express=require('express');
let printrouter=express();
let customerModel=require('../model/Cmodel');
let subnetModel=require('../model/Smodel');
let printerModel=require('../model/Pmodel');
const {MongoClient}= require('mongodb');
const methodOverride = require('method-override');
printrouter.use(methodOverride('_method'));

const path=require("path");
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
printrouter.set('view engine','ejs')
printrouter.set("views", path.join(appDir,"views"));


printrouter.get('/add-customer',(req,res)=>{
    res.render('Add-customer');

})
printrouter.post('/add-customer',async(req,res)=> {
    

    const newCustomer = new customerModel({
        id:req.body.id,
  
        cu_name:req.body.cu_name,
            
        cu_address:req.body.cu_address,

        contact_name:req.body.contact_name,
           
        email:req.body.email,
            
        phone: req.body.phone,
                
        Segment:req.body.segment,
    })
    if(req.body.id){
    newCustomer.save(function(err) {
        if (!err) {
            //console.log(req.body.id,req.body.cu_name);
            res.render("Add-customer",{result:"Successfully added a new customer."});
        } else {
            res.render("Add-customer",{result:err});
        }
    });}else {
        res.render("Add-customer");
    }
    
})

printrouter.get('/update-customer',(req,res)=>{
    res.render('update-customer');
})

printrouter.put('/customer',(req,res)=>{
   
    customerModel.update({
        id:req.body.id},{
  
        cu_name:req.body.cu_name,
            
        cu_address:req.body.cu_address,

        contact_name:req.body.contact_name,
           
        email:req.body.email,
            
        phone: req.body.phone,
                
        Segment:req.body.segment,
    },
    {overwrite:true},
    function(err){
        if(!err){
            res.send("Successfully updated the selected employee")
        }
    })
  
})




printrouter.get('/add-printers',(req,res)=>{
    res.render('Add-printer');
})

printrouter.post('/add-printers',(req,res)=>{
    const newPrinter = new printerModel({
        id:req.body.id, 

        department:req.body.department, 
                            
        contact_person:req.body.contact_person,

        email: req.body.email,

        phone: req.body.phone,
                            
        location:req.body.location,

        ip_address:req.body.ip_address,

        name:req.body.name,
            
        serial:req.body.serial,

        model: req.body.model,
                
        type:req.body.type,
    })

   if(req.body.id){ 
    newPrinter.save(function(err) {
        if (!err) {
            //console.log(req.body.id, req.body.email);
            res.render("Add-printer",{result:"Successfully added a new printer."});
        } else {
            res.render("Add-printer",{result:err});
        }
    });}else {
        res.render("Add-printer");
    }
})
let data,data1;
printrouter.get('/printers',async (req,res)=>{
    //console.log("in printers");
    const url='mongodb://localhost:27017/:';
    const databaseName='Print'
    const client=new MongoClient(url);
    let result=await client.connect()
    db=result.db(databaseName);
    collection= db.collection('printers');
    data1 = await collection.find({}).toArray();
    res.render('list-printers',{p:data1});
})






printrouter.get('/findby',async(req,res)=>{
    const url='mongodb://localhost:27017/:';
    const databaseName='Print'
    const client=new MongoClient(url);
    let result=await client.connect();
    db=result.db(databaseName);
    collection= db.collection('printers');
    let y=req.query.exampleList;
    let z=req.query.txt;
    //console.log(y,z);
    if(y=="id"){
      z=parseInt(req.query.txt);  
    }
    q={};
    q[y]=z;
    if(y!="all"){
        data1=await collection.find(q).toArray();
    }else{
        data1 = await collection.find({}).toArray();
    }
    
    //console.log(data1);
    res.render('list-printers',{p:data1});

})

printrouter.post('/pdelete',async(req,res)=>{
    //console.log("in printer delete");
    const url='mongodb://localhost:27017/:';
    const databaseName='Print'
    const client=new MongoClient(url);
    let result=await client.connect()
    db=result.db(databaseName);
    collection= db.collection('printers');
    collection.deleteOne({"id":parseInt(req.body.id)});
    //console.log(req.body.id);
    res.render('list-printers',{p:data1});

})


printrouter.get('/see-customers',async(req,res)=>{
    
        const url='mongodb://localhost:27017/:';
        const databaseName='Print';
        const client=new MongoClient(url);
        let result=await client.connect()
        db=result.db(databaseName);
        collection= db.collection('customers');
        let y=req.query.exampleList1;
        let z=req.query.txt1;
        //console.log(y,z);
        if(y=="id"){
            z=parseInt(req.query.txt1);  
          }
          q={};
          q[y]=z;
          if(y!="all"){
              data=await collection.find(q).toArray();
          }else{
              data = await collection.find({}).toArray();
          }
        res.render('list-customers',{c:data});
    })

    
printrouter.get('/customers',async (req,res)=>{
    const url='mongodb://localhost:27017/:';
    const databaseName='Print';
    const client=new MongoClient(url);
    let result=await client.connect()
    db=result.db(databaseName);
    collection= db.collection('customers');
    data = await collection.find({}).toArray();
    res.render('list-customers',{c:data});
})

/*printrouter.get('/customerbyid',async (req,res)=>{

        console.log("in customer id");
        const url='mongodb://localhost:27017/:';
        const databaseName='Print';
        const client=new MongoClient(url);
        let result=await client.connect();
        db=result.db(databaseName);
        collection= db.collection('customers');
        let x= await collection.find({"id":parseInt(req.query.id)}).toArray();
        datastring7=JSON.stringify(x);
        console.log(req.query.id,x);
        res.render('list-customers',{c:data,ci:datastring7});
    })*/
    
  
    
    printrouter.get('/printermetrics',async(req,res)=>{
        const url='mongodb://localhost:27017/:';
        const databaseName='Print'
        const client=new MongoClient(url);
        let result=await client.connect()
        db=result.db(databaseName);
        collection= db.collection('printermetrics');
        let x=await collection.find({"id":parseInt(req.query.id)}).toArray();
        let datastring= JSON.stringify(x);
        res.send(datastring);
    })

module.exports=printrouter;
/*


*/

