const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methOverride = require('method-override')

const Product = require('./models/product');
const { RSA_NO_PADDING } = require('constants');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!");
        console.log(err)
    })


app.set('views', path.join(__dirname), 'views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy', 'bake goods'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if(category) {
        const products = await Product.find({ category })
        res.render('./views/products/index', {products, category})
    } else {
        const products = await Product.find({})
        res.render('./views/products/index', {products, category: 'ALL'})
    }
    
})

app.get('/products/new', (req, res) => {
    // const products = await Product.find({})
    // console.log(products)
    res.render('./views/products/new', {categories})
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log(product);
    res.render('./views/products/show', {product})
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    // console.log(product);
    res.render('./views/products/edit', {product, categories})
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    // console.log(req.body)
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
    // res.send("YOU MADE IT!")
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})