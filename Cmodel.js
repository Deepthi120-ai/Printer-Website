let mongoose=require('mongoose');


const CustomerSchema = {
    
        id:Number,
  
        cu_name:String,
            
        cu_address:String,

        contact_name:String,
           
        email:String,
            
        phone: String,
                
        Segment:String,
}


const customerModel = mongoose.model("customer", CustomerSchema);

module.exports= customerModel;




