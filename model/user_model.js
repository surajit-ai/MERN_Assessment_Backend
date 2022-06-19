const mongoose=require('mongoose');

let UserSchema=mongoose.Schema({
    id:{type:'string'},
    name:{type:'string',required:true},
    email:{type:'string',required:true},
    password:{type:'string',required:true},
    isAdmin:{type:'bool',default:false},
    isActive:{type:'bool',default:true},
    join_time:{type:Date, default:Date.now},
    
},{timestamp:true});

module.exports=mongoose.model('users',UserSchema)