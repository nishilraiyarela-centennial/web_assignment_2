const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) { 
    res.status(400).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
    try {
      const { name } = req.query;
      const query = name ? { name: new RegExp(name, 'i') } : {};
      const products = await Product.find(query);
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not available' });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not available' });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not available' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany();
      res.status(200).json({ message: 'All products deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
