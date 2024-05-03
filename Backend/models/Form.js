const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
  title: String,
  thread: String,
});

const Community = mongoose.model("Community", FormSchema, "Community");
module.exports = Community;