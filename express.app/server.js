import express from 'express';


const app = express();

app.use(express.json());
const products = [];
//create a new product -    POST http://localhost:5000/products  payload: { name: laptop, price: 5000 }
app.post("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(200).json({ message: "Product created successfully", data: newProduct });
});
//Read all products - GET http://localhost:5000/products
app.get("/products", (req, res) => {
    res.status(200).json({ message: "All products fetched successfully", data: products });
});

//Read a single product - GET http://localhost:5000/products/:id
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.status(200).json({ message: "Product details fetched successfully", data: product });
    } else {
        res.status(404).json({ message: "Product not found" });
  
    }
});
//Update a product - PUT http://localhost:5000/products/:id  payload: { name: laptop, price: 600000 }
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        res.status(200).json({ message: "Product updated successfully", data: products[productIndex] });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
//Delete a product - DELETE http://localhost:5000/products/:id
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1);
        res.status(200).json({ message: "Product deleted successfully", data: deletedProduct[0] });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});




