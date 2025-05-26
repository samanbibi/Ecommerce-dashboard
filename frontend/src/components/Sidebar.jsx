import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-md font-medium hover:bg-gray-700 hover:text-white transition ${
      location.pathname === path ? "bg-gray-700 text-white" : "text-gray-300"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-6 shadow-lg">
      
      <div className="mb-8 flex justify-center">
        <div className="bg-white rounded-full p-4 shadow-lg">
          <img
            src="/lo.png" 
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>

      <nav className="space-y-3">
        <Link to="/revenue" className={linkClasses("/revenue")}>
          📈 Revenue
        </Link>
        <Link to="/inventory" className={linkClasses("/inventory")}>
          📦 Inventory
        </Link>
        <Link to="/register" className={linkClasses("/register")}>
          ➕ Add Product
        </Link>
      </nav>
    </aside>
  );
}
