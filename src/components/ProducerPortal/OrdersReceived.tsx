import { useState } from "react";
import { orders, products } from "../../constants/mockData";
import StatusBadge from "../Shared/StatusBadge";
import { ShoppingBag, MapPin, Calendar, Check, X, Eye } from "lucide-react";
import Modal from "../Shared/Modal";

export default function OrdersReceived() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const producerProducts = products.filter((p) => p.producerId === "user_2");
  const producerProductIds = new Set(producerProducts.map((p) => p.id));
  const producerOrders = orders.filter((o) => o.items.some((i) => producerProductIds.has(i.productId)));

  const filtered = filter === "all" ? producerOrders : producerOrders.filter((o) => o.status === filter);

  const statuses = Array.from(new Set(producerOrders.map((o) => o.status)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Orders Received</h3>
            <p className="text-xs text-muted-foreground">{producerOrders.length} orders for your products</p>
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
          All ({producerOrders.length})
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              filter === s ? "bg-primary text-primary-foreground" : "bg-gray-100 text-muted-foreground"
            }`}
          >
            {s} ({producerOrders.filter((o) => o.status === s).length})
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
                  <p className="text-xs text-muted-foreground">Buyer: {order.buyerName}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  Qty: {order.items.reduce((s, i) => s + i.quantity, 0)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Route: {order.deliveryRoute}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {order.createdAt}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="font-bold">₦{order.totalAmount.toLocaleString()}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> View
                  </button>
                  {order.status === "pending" && (
                    <>
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center gap-1">
                        <Check className="w-3 h-3" /> Accept
                      </button>
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-1">
                        <X className="w-3 h-3" /> Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-xl border">
          <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No orders received</p>
        </div>
      )}

      <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Order Details — #${selectedOrder?.id.slice(0, 8) || ""}`}>
        {selectedOrder && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{selectedOrder.buyerName}</span>
              <StatusBadge status={selectedOrder.status} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Items</p>
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-lg">
                  <span>{item.productTitle}</span>
                  <span>{item.quantity} × ₦{item.unitPrice.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm">Payment: {selectedOrder.paymentType}</span>
              <span className="font-bold">Total: ₦{selectedOrder.totalAmount.toLocaleString()}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Route: {selectedOrder.deliveryRoute}</span>
              <span className="flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" /> Est. delivery: {selectedOrder.estimatedDelivery}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}