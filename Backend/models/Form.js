const mongoose = require('mongoose')
const FormSchema = mongoose.Schema({
  title: String,
  thread: String,
})

module.exports = Form = mongoose.model("Community", FormSchema,"Community");
