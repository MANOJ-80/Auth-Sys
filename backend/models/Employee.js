const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
 
})



const EmplpyeeModel = mongoose.model("employees", EmployeeSchema)

module.exports = EmplpyeeModel;