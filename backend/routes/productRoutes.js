const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
  getAllProducts,
  addProduct,
  updateStock,
  deleteProduct
} = require('../controllers/productController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})

const upload = multer({ storage })

router.get('/', getAllProducts)
router.post('/', upload.single('image'), addProduct)
router.patch('/:id', updateStock)
router.delete('/:id', deleteProduct)

module.exports = router
