const express = require('express');
const axios = require('axios');
const Bank = require('../model/bank');
const router = express.Router();
const TransactionJson = require('../Transactions.json')
router.get('/', async (req, res) => {
    try {
      const transactions = await Bank.find({});
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.post('/transactions', async (req, res) => {
    const transaction = new Bank(req.body);
    try {
      const newTransaction = await transaction.save();
      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.delete('/transactions/:id', async (req, res) => {
    try {
      const deletedTransaction = await Bank.findByIdAndDelete(req.params.id);
      if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });
      res.json({ message: 'Transaction deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get('/breakdown',async (req, res)=>{
  try{
    const transactions = await Bank.aggregate([
        {$group:{_id:'$category',total:{$sum: '$amount'}}}
    ])
    res.json(transactions)
  } catch(error){
    res.status(500).json({message: error.message});
  }
  });
  router.get('/fillDb', async (req, res) => {
    try {
        await Bank.deleteMany({})
        for (const t of TransactionJson) {

            const newTransactionSaved = new Bank(t)
            await newTransactionSaved.save()
        }
        res.json({ success: true, message: "Transactions were regenerated"})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get('/transactions-by-month/:month', async (req, res) => {
    try {
      const month = req.params.month; 
      const transactions = await Bank.find({ month: month }); 
      res.json(transactions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;


 