import { useState } from 'react'
import axios from 'axios'

export default function ProductForm() {
  const [product, setProduct] = useState({ name: '', description: '', price: '', stock: '' })
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(product).forEach(([key, val]) => formData.append(key, val))
    if (image) formData.append('image', image)

    try {
      await axios.post('http://localhost:5000/api/products', formData)
      alert('Product added successfully!')
      setProduct({ name: '', description: '', price: '', stock: '' })
      setImage(null)
    } catch (err) {
      console.error(err)
      alert('Error submitting product')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl p-12 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">➕ Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Name */}
          <div className="flex items-center space-x-6">
            <label htmlFor="name" className="w-36 text-gray-700 font-medium">
              Product Name:
            </label>
            <input
              id="name"
              type="text"
              value={product.name}
              onChange={e => setProduct({ ...product, name: e.target.value })}
              placeholder="Enter product name"
              className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="flex items-start space-x-6">
            <label htmlFor="description" className="w-36 text-gray-700 font-medium pt-3">
              Description:
            </label>
            <textarea
              id="description"
              rows={5}
              value={product.description}
              onChange={e => setProduct({ ...product, description: e.target.value })}
              placeholder="Enter product description"
              className="flex-1 px-5 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div className="flex items-center space-x-6">
            <label htmlFor="price" className="w-36 text-gray-700 font-medium">
              Price:
            </label>
            <input
              id="price"
              type="number"
              value={product.price}
              onChange={e => setProduct({ ...product, price: e.target.value })}
              placeholder="Enter price"
              className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Stock */}
          <div className="flex items-center space-x-6">
            <label htmlFor="stock" className="w-36 text-gray-700 font-medium">
              Stock:
            </label>
            <input
              id="stock"
              type="number"
              value={product.stock}
              onChange={e => setProduct({ ...product, stock: e.target.value })}
              placeholder="Enter stock quantity"
              className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image */}
          <div className="flex items-center space-x-6">
            <label htmlFor="image" className="w-36 text-gray-700 font-medium">
              Product Image:
            </label>
            <input
              id="image"
              type="file"
              onChange={e => setImage(e.target.files[0])}
              className="flex-1 text-gray-700
                         file:mr-4 file:py-2 file:px-5
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-100 file:text-indigo-700
                         hover:file:bg-indigo-200
                         cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}
