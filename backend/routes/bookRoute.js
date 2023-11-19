import express from 'express';
import { BookModel } from '../models/bookmodel.js';

const router = express.Router();

router.get('/', async(req,res)=>{
    try {
        const book = await BookModel.find({});
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
})
router.get('/:id', async(req,res)=>{
    try {
        const { id } = req.params;
        const book = await BookModel.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
})
router.put('/:id', async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message:"Send all the required fields"});
        }
        const { id } = req.params;
        const result = await BookModel.findByIdAndUpdate(id,req.body);
        if(!result){
           return res.status(404).send({message:"Book not found"});
        }
       return res.status(200).send({message:"Book updated successfully"});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
});
router.delete('/:id',async (req,res)=>{
try {
    const { id } = req.params;
    const result = await BookModel.findByIdAndDelete(id);
    if(!result) return res.status(404).send({message:"Unable to find the book to delete"});
    return res.status(200).send({message:"Successfully deleted"});
} catch (error) {
    return res.status(500).send({message:error.message});
}

});
router.post('/',async (req,res)=>{
try {
    if(!req.body.title || !req.body.author || !req.body.publishYear){
        return res.status(400).send({message:"Send all the required fields"});
    }
    const newBook = {
        title:req.body.title,
        author:req.body.author,
        PublishYear:req.body.publishYear
    }
    const book = await BookModel.create(newBook);
    return res.status(201).send(book);
    
} catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
}
})

export default router;