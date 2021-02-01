// Require necessary NPM packages
const mongoose = require('mongoose'), Schema = mongoose.Schema;
// Define  Schema

const jobSchema = new mongoose.Schema(
	{
		title: { type: String, required: true},
		Description: { type: Array, required: true },
		skills: {type: Array},
		summary:{type:String},
		date: { type: Date, default: Date.now },
		EmploymentType:{type:String},
		location: String,
		company: {type: String, required: true },
		Department: { type: String, required: true },
		// users:[{type: Schema.Types.ObjectId, ref: 'User'}]
	},
	{
		timestamps: true,
	}
);
 
//==============Deleted==============
// const UserSchema = new mongoose.Schema(
// 	{
// 		name: { type: String, required: true },
// 		type: { type: String, required: true },
// 		resume: { type: mongoose.Schema.Types.Mixed},
// 		email: { type:String, required:true },
// 		passowrd: { type: String, required: true },
// 		jobs: [{type: Schema.Types.ObjectId, ref: 'Job'}]
// 	},
// 	{
// 		timestamps: true,
// 	}
// );


const CompanySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type:String , required: true },
		location: { type: String, required: true },
		logo: {type:String},
		jobs: [jobSchema],
	},
	{
		timestamps: true,
	}
);

// Compile our Model based on the Schema
const Job = mongoose.model('Job', jobSchema);
const Company = mongoose.model('Company', CompanySchema);
// const User = mongoose.model('User', UserSchema);

// Export our Model for use
module.exports = {Job, Company};
