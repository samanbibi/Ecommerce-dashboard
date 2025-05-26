import InventoryTable from '../components/InventoryTable'

export default function Inventory() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Inventory Management</h3>
      <div className="bg-white p-6 rounded-lg shadow">
        <InventoryTable />
      </div>
    </div>
  )
}
