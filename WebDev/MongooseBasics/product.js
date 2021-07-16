const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO ERROR!!!");
        console.log(err)
    })

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL']
    }
});

// productSchema.methods.greet = function () {
//     console.log("HELLO!!!! HI!! HOWDY!!! ")
//     console.log(`- from ${this.name}`)
// }

productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.statics.fireSale = function() {
    this.updateMany({}, { onSale: true, price: 0 })
}

var Product = mongoose.model('Product', productSchema);

var findProduct = async () => {
    var foundProduct = await Product.findOne({ name: 'Bike Helmet' });
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
}

findProduct();
// Product.fireSale().then(res => console.log(res))

// const bike = new Product({ name: 'Cycling Jersey', price: 28.50, categories: ['Cycling'], size: 'XS'})
// bike.save()
//     .then(data => {
//         console.log("IT WORKDED!!!")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!!")
//         console.log(err)
//     })
