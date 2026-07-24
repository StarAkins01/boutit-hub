import { useState } from "react";
import { collaterals } from "../../constants/mockData";
import { Shield, Warehouse, FileText, Check, Plus, Package } from "lucide-react";
import Modal from "../Shared/Modal";

export default function CollateralManager() {
  const [selected, setSelected] = useState<typeof collaterals[0] | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Collateral Management</h3>
            <p className="text-xs text-muted-foreground">{collaterals.length} registered assets</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Package className="w-4 h-4" />
          Add Collateral
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {collaterals.map((item) => {
          const valuePct = Math.round((item.loanValue / item.estimatedValue) * 100);
          return (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="bg-white rounded-xl border p-4 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Warehouse className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{item.inventoryTitle}</h4>
                    <p className="text-xs text-muted-foreground">Producer #{item.producerId}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === "active" ? "bg-green-100 text-green-700" :
                  item.status === "released" ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t">
                <span className="text-muted-foreground">Est. Value</span>
                <span className="font-semibold">₦{item.estimatedValue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Loan Value</span>
                <span className="font-semibold">₦{item.loanValue.toLocaleString()} ({valuePct}% LTV)</span>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.inventoryTitle || ""}>
        {selected && (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">Registered on {selected.createdAt}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Estimated Value</p>
                <p className="text-xl font-bold">₦{selected.estimatedValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Loan Value</p>
                <p className="text-xl font-bold">₦{selected.loanValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Status</p>
                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selected.status === "active" ? "bg-green-100 text-green-700" :
                  selected.status === "released" ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {selected.status}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground">LTV Ratio</p>
                <p className="text-xl font-bold">{Math.round(selected.loanValue / selected.estimatedValue * 100)}%</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Register New Collateral">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Inventory Title</label>
            <input type="text" className="w-full rounded-xl border p-2.5 text-sm" placeholder="e.g. Finished Leather Soles (50,000 pairs)" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Estimated Value (₦)</label>
            <input type="number" className="w-full rounded-xl border p-2.5 text-sm" placeholder="5000000" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Supporting Documents</label>
            <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Upload documents (PDF, JPG)</p>
            </div>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            Submit Collateral
          </button>
        </div>
      </Modal>
    </div>
  );
}