import { useState } from "react";
import { orders, bulkPools } from "../../constants/mockData";
import StatusBadge from "../Shared/StatusBadge";
import { ShoppingBag, Package, MapPin, Calendar, Copy } from "lucide-react";

export default function MyOrders() {
  const [filter, setFilter] = useState<string>("all");
  const buyerOrders = orders.filter((o) => o.buyerId === "user_1");

  const filtered = filter === "all" ? buyerOrders : buyerOrders.filter((o) => o.status === filter);

  const statuses = Array.from(new Set(buyerOrders.map((o) => o.status)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">My Orders</h3>
            <p className="text-xs text-muted-foreground">{buyerOrders.length} orders</p>
          </div>
        </div>
      </div>

      {/* Dynamic Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
            filter === "all" ? "bg-primary text-primary-foreground" : "bg-gray-100 text-muted-foreground"
          }`}
        >
          All ({buyerOrders.length})
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              filter === s ? "bg-primary text-primary-foreground" : "bg-gray-100 text-muted-foreground"
            }`}
          >
            {s} ({buyerOrders.filter((o) => o.status === s).length})
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">{order.items.map((i) => i.productTitle).join(", ")}</p>
                  <p className="text-xs text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  Qty: {order.items.reduce((s, i) => s + i.quantity, 0)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {order.deliveryRoute}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {order.createdAt}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="font-bold">₦{order.totalAmount.toLocaleString()}</span>
                <button className="text-xs text-primary hover:underline flex items-center gap-1">
                  <Copy className="w-3 h-3" /> Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-xl border">
          <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No orders found</p>
        </div>
      )}
    </div>
  );
}