const express = require('express')
const port = 3000

const Book = require("./models/bookModel")


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


const mongoose = require('mongoose');
mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:admin@cluster0.p4obj6b.mongodb.net/Node-API')
.then(() => {
    console.log('connected to mongo')
}).catch((error) => {
    console.log(error)
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})    





app.get('/books', async(req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/books/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/books', async(req, res) => {
try {
    const book = await Book.create(req.body)
    res.status(200).json(book)
} catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
}
})

app.put('/books/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);

        if(!book){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }

        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/books/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(book);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
