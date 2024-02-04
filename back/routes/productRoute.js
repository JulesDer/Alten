const express = require('express');
const router = express.Router();
const fs = require('fs');

//GET
router.get('', (req, res) => {
    const data = JSON.parse(fs.readFileSync('../front/src/assets/products.json', 'utf8'));
    res.json(data.data);
});

// GETBYID
router.get('/:productId', (req, res) => {
    const rawData = fs.readFileSync('../front/src/assets/products.json', 'utf8');
    const data = JSON.parse(rawData);
    const productId = parseInt(req.params.productId, 10);
    const product = data.data.find((p) => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});


//CREATE
router.post('', (req, res) => {
    const newProduct = req.body;

    const rawData = fs.readFileSync('../front/src/assets/products.json', 'utf8');
    const data = JSON.parse(rawData);

    // id
    const lastId = data.data.length > 0 ? data.data[data.data.length - 1].id : 0;
    newProduct.id = lastId + 1;


    data.data.push(newProduct);
    fs.writeFileSync('../front/src/assets/products.json', JSON.stringify(data, null, 2));

    res.json(newProduct);
}
);

//DELETE
router.delete('/:productId', (req, res) => {
    const productId = parseInt(req.params.productId, 10);

    const rawData = fs.readFileSync("../front/src/assets/products.json", 'utf8');
    const data = JSON.parse(rawData);

    const productIndex = data.data.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        const deletedProduct = data.data.splice(productIndex, 1)[0];
        fs.writeFileSync("../front/src/assets/products.json", JSON.stringify(data, null, 2));
        res.json(deletedProduct);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// UPDATE
router.post('/:productId', (req, res) => {
    const productId = parseInt(req.params.productId, 10); // Convert productId to an integer
    const updatedProduct = req.body;
    const rawData = fs.readFileSync("../front/src/assets/products.json", 'utf8');
    const data = JSON.parse(rawData);

    // Find the index of the product with the given ID
    const productIndex = data.data.findIndex(product => product.id === productId);

    // If the product with the given ID is found, update it
    if (productIndex !== -1) {
        data.data[productIndex] = { ...data.data[productIndex], ...updatedProduct };

        fs.writeFileSync("../front/src/assets/products.json", JSON.stringify(data, null, 2));

        res.json({ success: true, message: 'Product updated successfully' });
    } else {
        // If the product with the given ID is not found, return an error
        res.status(404).json({ success: false, message: 'Product not found' });
    }
});

module.exports = router;
