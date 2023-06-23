let mongoose= require('mongoose');

const PrintmetricSchema={

    id:Number,
    
    status: String,                
    
    count:Number,

    catridge:String,

    errorcode:String,


}

const printermetricModel= mongoose.model("printermetricData",PrintmetricSchema);

module.exports=printermetricModel;