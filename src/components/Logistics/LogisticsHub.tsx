import { logisticsRoutes, deliveryRequests } from "../../constants/mockData";
import { Truck, Route, Map, Navigation, MapPin, Weight, Clock, ArrowRight } from "lucide-react";

export default function LogisticsHub() {
  const activeDeliveries = deliveryRequests.filter((r) => r.status !== "delivered");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center">
          <Truck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Logistics Hub</h2>
          <p className="text-sm text-muted-foreground">{activeDeliveries.length} active deliveries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <Route className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Deliveries</p>
              <p className="text-2xl font-bold">{activeDeliveries.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivered</p>
              <p className="text-2xl font-bold">{deliveryRequests.filter((r) => r.status === "delivered").length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Coverage</p>
              <p className="text-2xl font-bold">{logisticsRoutes.length} routes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Routes */}
      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-semibold mb-4">Available Routes</h3>
        <div className="space-y-3">
          {logisticsRoutes.map((route) => (
            <div key={route.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {route.from} <ArrowRight className="w-3 h-3 inline mx-1" /> {route.to}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {route.distanceKm} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {route.estimatedHours}h
                    </span>
                    <span className="flex items-center gap-1">
                      <Weight className="w-3 h-3" /> ₦{route.freightCostPerKg}/kg
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {route.bulkDiscountPct}% off over {route.bulkDiscountThreshold}kg
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Delivery Tracking */}
      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-semibold mb-4">Active Delivery Tracking</h3>
        {activeDeliveries.length > 0 ? (
          <div className="space-y-4">
            {activeDeliveries.map((delivery) => {
              const route = logisticsRoutes.find((r) => r.id === delivery.routeId);
              const progressPct = delivery.status === "in_transit" ? 50 : delivery.status === "delivered" ? 100 : 10;
              return (
                <div key={delivery.id} className="border rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-sm">Delivery #{delivery.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {route ? `${route.from} → ${route.to}` : "Unknown route"} · {delivery.weightKg}kg
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      delivery.status === "delivered" ? "bg-green-100 text-green-700" :
                      delivery.status === "in_transit" ? "bg-cyan-100 text-cyan-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {delivery.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        delivery.status === "delivered" ? "bg-green-500" :
                        delivery.status === "in_transit" ? "bg-cyan-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Cost: ₦{delivery.cost.toLocaleString()}</span>
                    <span>Est: {delivery.estimatedDelivery}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-6">No active deliveries</p>
        )}
      </div>
    </div>
  );
}