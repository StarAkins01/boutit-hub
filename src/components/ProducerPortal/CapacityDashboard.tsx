import { products, orders } from "../../constants/mockData";
import { TrendingUp, Package, Factory, Users, Percent, BarChart3 } from "lucide-react";

export default function CapacityDashboard() {
  const totalCapacity = products.reduce((s, p) => s + p.totalCapacity, 0);
  const totalIdle = products.reduce((s, p) => s + (p.totalCapacity * p.idleCapacityPct / 100), 0);
  const avgIdlePct = Math.round((totalIdle / totalCapacity) * 100);
  const producerOrders = orders.filter((o) => o.items.some((i) => products.find((p) => p.id === i.productId)));
  const pendingOrders = producerOrders.filter((o) => o.status === "pending" || o.status === "processing" || o.status === "confirmed");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
          <Factory className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">Capacity Dashboard</h3>
          <p className="text-xs text-muted-foreground">{products.length} products · {totalCapacity.toLocaleString()} total units capacity</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Products Listed</p>
              <p className="text-xl font-bold">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Idle Capacity</p>
              <p className="text-xl font-bold">{avgIdlePct}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Orders</p>
              <p className="text-xl font-bold">{pendingOrders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Utilization</p>
              <p className="text-xl font-bold">{100 - avgIdlePct}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Capacity Breakdown */}
      <div className="bg-white rounded-xl border p-5">
        <h4 className="font-semibold mb-4">Product Capacity Breakdown</h4>
        <div className="space-y-3">
          {products.map((prod) => {
            const usedPct = 100 - prod.idleCapacityPct;
            return (
              <div key={prod.id} className="flex items-center gap-4">
                <div className="w-32 flex-shrink-0">
                  <p className="text-sm font-medium truncate">{prod.title.slice(0, 24)}</p>
                  <p className="text-xs text-muted-foreground">{prod.unit}</p>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{usedPct}% used</span>
                    <span>{prod.totalCapacity.toLocaleString()} units</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-orange-500" style={{ width: `${usedPct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}