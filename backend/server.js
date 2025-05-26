const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const productRoutes = require('./routes/productRoutes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Serve uploaded images
app.use('/uploads', express.static('uploads'))

// Mount product routes
app.use('/api/products', productRoutes)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(5000, () => console.log('Server running on port 5000')))
.catch(err => console.error(err))
