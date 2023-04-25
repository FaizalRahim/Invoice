const mongoose = require('mongoose');

//Define the schem for a user Company details document
const UserCompanyDetailsSchema = new mongoose.Schema({
    userCompanyName: {
        type: String,
        trim: true,
        required: true
    },
    userCompanyAddress: {
        type: String,
        trim: true,
        required: true 
    },
    companyBankAccount: {
        type: String,
        trim: true,
        required: true,
    },
});

//Create a User model based on the schema
const UserCompanyDetails = mongoose.model('UserCompanyDetails',UserCompanyDetailsSchema);

//Export 
module.exports = UserCompanyDetails;