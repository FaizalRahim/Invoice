const Client = require ('../models/clientModel');

// Create a new client
const createClient = async(req,res) => {
    const client = new Client({
        companyName: req.body.companyName,
        companyAddress: req.body.companyAddress,
        companyEmail: req.body.companyEmail,
        personInCharge: req.body.personInCharge,
        paymentTerm: req.body.paymentTerm
    });
    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (error){
        res.status(400).json({message: error.message});
    };
};

// Get all clients
const getClients = async(req,res) => {
    try{
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({message: error.message})
    };
};

// Get a single client by id
const getClientById = async(req,res) => {
    try{
        const client = await Client.findById(req.params.id);
        if (client === null ){
            return res.status(404).json ({message: "Client not found"});
        }
        res.json(client);
    } catch (error) {
        res.status(404).json({message: "Client not found"});
    };
};

//Delete a client by id
const deleteClient = async (req,res) =>{
    try {
        const client = await Client.findById(req.params.id);
        if(client === null) {
            return res.status(404).json({message: "Client not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    };
};

//Update a client by id
const updateClient = async (req,res) => {
    try {
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        if (client === null) {
            return res.status(404).json({message: "Client not found"});
        }
        res.json(client);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports={
    createClient,
    getClients,
    getClientById,
    deleteClient,
    updateClient,
};