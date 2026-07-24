import { useState } from "react";
import { Plus, Image, X, Package, MapPin } from "lucide-react";

const categories = ["Cocoa", "Cassava", "Shea Butter", "Palm Oil", "Textiles", "Spices", "Grains"];

export default function InventoryPostForm() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Cocoa",
    price: "",
    minOrder: "",
    maxOrder: "",
    description: "",
    origin: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setShowForm(false);
    setForm({ name: "", category: "Cocoa", price: "", minOrder: "", maxOrder: "", description: "", origin: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Inventory & Listings</h3>
            <p className="text-xs text-muted-foreground">Manage your product listings</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Listing
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm"
                  placeholder="e.g. Premium Cocoa Beans"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm bg-white"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Price (₦/unit)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm"
                  placeholder="1500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Origin/Region</label>
                <input
                  type="text"
                  value={form.origin}
                  onChange={(e) => setForm({ ...form, origin: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm"
                  placeholder="e.g. Ondo State"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Min Order Qty</label>
                <input
                  type="number"
                  value={form.minOrder}
                  onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm"
                  placeholder="50"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Max Order Qty</label>
                <input
                  type="number"
                  value={form.maxOrder}
                  onChange={(e) => setForm({ ...form, maxOrder: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm"
                  placeholder="5000"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm"
                rows={3}
                placeholder="Describe your product, quality, certifications..."
              />
            </div>
            <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Upload product images (optional)</p>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-primary text-white py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Publish Listing
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}