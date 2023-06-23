let mongoose=require('mongoose');

const SubnetSchema={
    id:Number,
    
    subnet_address:String,

    department:String,

    location:String,
    
    email: String,

    phone:String,
    
    contact_name:String,

}

const subnetModel =mongoose.model("subnetData",SubnetSchema);

module.exports= subnetModel;