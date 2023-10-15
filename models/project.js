const mongoose = require('mongoose')

const schemaDefObj =  {
    name: {type: String, require: true},
    dueDate: {type: Date},
    course: {type:String, require: true},
    status : {type:String, default: "TO DO"}
}

const projectSchema = new mongoose.Schema(schemaDefObj)
module.exports = mongoose.model("Project", projectSchema)