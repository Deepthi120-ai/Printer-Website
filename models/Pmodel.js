let mongoose=require('mongoose');

const PrinterSchema = {

    
    id:Number, 

    department:String, 
                        
    contact_person:String,

    email: String,

    phone: String,
                        
    location:String,

    ip_address:String,

    name:String,
        
    serial:String,

    model: String,
            
    type:String,
                        
}

const printerlist={

    printerinfo: Object,

    printermetrics:Object,
}

let printerModel=mongoose.model("printers",PrinterSchema);

module.exports=printerModel;