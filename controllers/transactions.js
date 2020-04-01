
const Transaction = require('../models/Transaction');

//@desc GET all transaction
//@route get/api/v1/transaction
//@access public
exports.getTransactions =async (req,res,next) => {
    try {
const transactions = await  Transaction.find();

 return res.status(200).json({
success: true,
count: transactions.length,
data: transactions
 });
    } catch(err) {
 return res.status(500).json({
     success: false,
     error: 'server error'
 })
    }
}
//@desc ADD all transaction
//@route POST/api/v1/transaction
//@access public
exports.addTransaction =async (req,res,next) => {
 try {
    const {text ,amount} = req.body;

    const transaction = await Transaction.create(req.body);
  
    return res.status(201).json({
        success: true,
        data: transaction
    });
     
 } catch (err) {
  if(err.name === 'ValidationError'){
const messages = Object.values(err.errors).map(val => val.message);

return res.status(400).json({
     success: false,
     error: messages 
 })
  } else{
    return res.status(500).json({
        success: false,
        error: 'server error'
    })
  }

 }


  
}
//@desc delete all transaction
//@route delete/api/v1/transaction
//@access public
exports.deleteTransaction =async (req,res,next) => {
 try {
     const transaction = await Transaction.findById(req.params.id);

     if(!transaction){
         return res.status(404).json({
             success: false,
             error : 'no transaction found'
         });
     }

     await transaction.remove();

     return res.status(200).json({
         success: true,
         data: {}
     })

 } catch (err) {
    return res.status(500).json({
        success: false,
        error: 'server error'
    })
 }
}
