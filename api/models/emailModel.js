var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
	name:{
		type: String
	},
	description: {
		type: String,
		required: true,
	},
	created_at: Date,
  	updated_at: Date
})

emailSchema.pre('save', function(next){
	var currentDate = new Date();
	this.updated_at = currentDate;

	if(!this.created_at){
		this.created_at = currentDate;
	}
	next();
})

var Emailcollection = mongoose.model('Emailcollection', emailSchema);

emailSchema.methods.summary = function(){
	var summary = this.name + this.email;
	return summary
}
module.exports = Emailcollection;