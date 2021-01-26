// Require necessary NPM packages
const mongoose = require('mongoose'), Schema = mongoose.Schema;
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid';

// Define  Schema

const jobSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		Description: { type: String, required: true },
		date: { type: Date, default: Date.now },
		city: String,
		Department: { type: String, required: true },
		users:[{type: Schema.Types.ObjectId, ref: 'User'}]
	},
	{
		timestamps: true,
	}
);
 
const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		type: { type: String, required: true },
		resume: { type: mongoose.Schema.Types.Mixed},
		email: { type: mongoose.SchemaTypes.Email, required: true, index: { unique: true } },
		passowrd: { type: String, required: true },
		jobs: [{type: Schema.Types.ObjectId, ref: 'Job'}]
	},
	{
		timestamps: true,
	}
);


const CompanySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		///Logo pic
		email: { type: mongoose.SchemaTypes.Email, required: true },
		location: { type: String, required: true },
		users: [UserSchema] ,
		jobs: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);



// Compile our Model based on the Schema
const Job = mongoose.model('Job', jobSchema);
const Company = mongoose.model('Company', CompanySchema);
const User = mongoose.model('User', UserSchema);

// Export our Model for use
module.exports = {Job, Company, User};
