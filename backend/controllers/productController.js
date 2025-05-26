const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}

const addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body
  const image = req.file ? req.file.path : ''
  const product = new Product({ name, description, price, stock, image })
  await product.save()
  res.status(201).json(product)
}

const updateStock = async (req, res) => {
  const { id } = req.params
  const { stock } = req.body
  const product = await Product.findByIdAndUpdate(id, { stock }, { new: true })
  res.json(product)
}

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// ✅ Use module.exports once
module.exports = {
  getAllProducts,
  addProduct,
  updateStock,
  deleteProduct
}
