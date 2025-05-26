import { useEffect, useState } from "react";
import axios from "axios";

export default function InventoryTable() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleStockChange = (id, newStock) => {
    axios
      .patch(`http://localhost:5000/api/products/${id}`, { stock: newStock })
      .then(() => {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, stock: newStock } : p))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product deleted successfully");
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedProducts = [...products]
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/3"
        />
        <div className="flex gap-2">
          <button
            onClick={() => handleSort("price")}
            className="bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
          >
            Sort by Price
          </button>
          <button
            onClick={() => handleSort("stock")}
            className="bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
          >
            Sort by Stock
          </button>
        </div>
      </div>

      <table className="table-auto w-full border text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Product</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Price</th>
            <th className="p-2">Image</th>
            <th className="p-2">Update</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts.map((product) => (
            <tr
              key={product._id}
              className={product.stock < 10 ? "bg-red-100" : ""}
            >
              <td className="p-2 font-medium">{product.name}</td>
              <td className="p-2">
                {product.stock}
                {product.stock < 10 && (
                  <span className="text-red-600 ml-2 font-semibold">
                    Low!
                  </span>
                )}
              </td>
              <td className="p-2">${product.price}</td>
              <td className="p-2">
                {product.image && (
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) =>
                    handleStockChange(product._id, Number(e.target.value))
                  }
                  className="border p-1 w-20"
                />
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Restock Forecast (Mock) */}
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-800 rounded-md">
        <h3 className="font-bold">Restock Forecast</h3>
        <p>
          Products with low stock should be reordered within the next 7 days to
          avoid shortages.
        </p>
      </div>
    </div>
  );
}
