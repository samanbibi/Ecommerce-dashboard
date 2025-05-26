import ProductForm from '../components/ProductForm'

export default function Register() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Add New Product</h3>
      <div className="bg-white p-6 rounded-lg shadow max-w-xl">
        <ProductForm />
      </div>
    </div>
  )
}
