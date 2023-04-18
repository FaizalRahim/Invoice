const easyinvoice = require('easyinvoice');
const fs = require('fs');

let data = {};

easyinvoice.createInvoice(data, function (result){
    fs.writeFileSync("invoice.pdf",result.pdf,'base64')
});
