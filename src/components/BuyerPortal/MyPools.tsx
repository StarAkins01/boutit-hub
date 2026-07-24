import { useState } from "react";
import { bulkPools } from "../../constants/mockData";
import { Package, Users, Clock, Percent } from "lucide-react";

export default function MyPools() {
  const [filter, setFilter] = useState<string>("all");
  const myPools = bulkPools;

  const filtered = filter === "all" ? myPools : myPools.filter((p) => {
    const daysLeft = Math.ceil((new Date(p.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (filter === "active") return daysLeft > 0;
    if (filter === "expired") return daysLeft <= 0;
    return true;
  });

  const filterOptions = [
    { key: "all", label: "All", count: myPools.length },
    { key: "active", label: "Active", count: myPools.filter(p => Math.ceil((new Date(p.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) > 0).length },
    { key: "expired", label: "Expired", count: myPools.filter(p => Math.ceil((new Date(p.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) <= 0).length },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">My Pools</h3>
          <p className="text-xs text-muted-foreground">{myPools.length} total pools</p>
        </div>
      </div>

      {/* Dynamic Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setFilter(opt.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              filter === opt.key ? "bg-primary text-primary-foreground" : "bg-gray-100 text-muted-foreground"
            }`}
          >
            {opt.label} ({opt.count})
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((pool) => {
            const discountPct = Math.round(((pool.originalPrice - pool.unitDiscountPrice) / pool.originalPrice) * 100);
            const progressPct = (pool.currentQuantity / pool.targetQuantity) * 100;
            const daysLeft = Math.ceil((new Date(pool.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            return (
              <div key={pool.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{pool.title}</p>
                    <p className="text-xs text-muted-foreground">{pool.description.slice(0, 80)}...</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    daysLeft > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {daysLeft > 0 ? "Active" : "Expired"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold">₦{pool.unitDiscountPrice.toLocaleString()}/{pool.unit}</span>
                  <span className="flex items-center gap-1 text-green-600">
                    <Percent className="w-3 h-3" /> {discountPct}% off
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: `${Math.min(progressPct, 100)}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {pool.participantsCount} participants
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-xl border">
          <Package className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No pools found</p>
        </div>
      )}
    </div>
  );
}