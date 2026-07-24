import { useState } from "react";
import {
  LayoutDashboard, Store, CreditCard, Factory, ShoppingBag, Truck, Menu, X, Bell, User, ChevronDown, Coins, TrendingUp, Users, Package, MapPin, ArrowUpRight
} from "lucide-react";
import MetricCard from "./components/Shared/MetricCard";
import MarketplaceSection from "./components/Marketplace/MarketplaceSection";
import CreditAssessment from "./components/CreditHub/CreditAssessment";
import BNPLCalculator from "./components/CreditHub/BNPLCalculator";
import CollateralManager from "./components/CreditHub/CollateralManager";
import CapacityDashboard from "./components/ProducerPortal/CapacityDashboard";
import InventoryPostForm from "./components/ProducerPortal/InventoryPostForm";
import OrdersReceived from "./components/ProducerPortal/OrdersReceived";
import MyOrders from "./components/BuyerPortal/MyOrders";
import MyPools from "./components/BuyerPortal/MyPools";
import LogisticsHub from "./components/Logistics/LogisticsHub";

type Section = "dashboard" | "marketplace" | "credit" | "producer" | "buyer" | "logistics";

const navItems = [
  { id: "dashboard" as Section, label: "Dashboard", icon: LayoutDashboard },
  { id: "marketplace" as Section, label: "Marketplace", icon: Store },
  { id: "credit" as Section, label: "Credit Hub", icon: CreditCard },
  { id: "producer" as Section, label: "Producer Portal", icon: Factory },
  { id: "buyer" as Section, label: "Buyer Portal", icon: ShoppingBag },
  { id: "logistics" as Section, label: "Logistics", icon: Truck },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />;
      case "marketplace":
        return <MarketplaceSection />;
      case "credit":
        return <CreditHubSection />;
      case "producer":
        return <ProducerSection />;
      case "buyer":
        return <BuyerSection />;
      case "logistics":
        return <LogisticsHub />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                DC
              </div>
              <span className="font-bold text-lg hidden sm:block">Digital Cooperative</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium hidden sm:block">Akintola Traders</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border">
            <p className="text-xs font-medium mb-1">Cooperative Credit</p>
            <p className="text-lg font-bold">₦2,450,000</p>
            <p className="text-xs text-muted-foreground">Available limit</p>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

/* ===== Dashboard Section ===== */
function DashboardSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Welcome back, Akintola Traders</h1>
        <p className="text-muted-foreground text-sm">Here's your cooperative overview for today</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard title="Revenue" value="₦12.4M" icon="revenue" trend="up" trendValue="+18.2%" />
        <MetricCard title="Active Orders" value="1,247" icon="orders" trend="up" trendValue="+12%" />
        <MetricCard title="Cooperative Members" value="3,842" icon="users" trend="up" trendValue="+5.3%" />
        <MetricCard title="Active Pools" value="28" icon="pools" trend="up" trendValue="+8%" />
        <MetricCard title="Credit Score" value="720" icon="credit" trend="up" trendValue="+15" />
        <MetricCard title="Fulfillment" value="94.2%" icon="fulfillment" trend="neutral" trendValue="+0.5%" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border p-5">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Store, label: "Browse Marketplace", color: "text-blue-600 bg-blue-100", section: "marketplace" as Section },
            { icon: CreditCard, label: "Apply for Credit", color: "text-indigo-600 bg-indigo-100", section: "credit" as Section },
            { icon: Factory, label: "Producer Tools", color: "text-orange-600 bg-orange-100", section: "producer" as Section },
            { icon: Truck, label: "Track Logistics", color: "text-cyan-600 bg-cyan-100", section: "logistics" as Section },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="flex items-center gap-3 p-4 rounded-xl border hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity + Market Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { icon: ShoppingBag, text: "New order placed - 500kg Cocoa Beans", time: "2 min ago", color: "text-blue-600 bg-blue-100" },
              { icon: Coins, text: "BNPL repayment of ₦125,000 confirmed", time: "1 hour ago", color: "text-green-600 bg-green-100" },
              { icon: Users, text: "15 new members joined cooperative", time: "3 hours ago", color: "text-purple-600 bg-purple-100" },
              { icon: Package, text: "Bulk pool 'Palm Oil Q3' reached target", time: "5 hours ago", color: "text-amber-600 bg-amber-100" },
              { icon: Truck, text: "Shipment #SH-2024-084 arrived in Lagos", time: "1 day ago", color: "text-cyan-600 bg-cyan-100" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold mb-4">Market Overview</h3>
          <div className="space-y-4">
            {[
              { commodity: "Cocoa", price: "₦4,250/kg", change: "+2.3%", up: true },
              { commodity: "Cassava", price: "₦185/kg", change: "-0.8%", up: false },
              { commodity: "Palm Oil", price: "₦1,480/ltr", change: "+1.5%", up: true },
              { commodity: "Shea Butter", price: "₦3,200/kg", change: "+3.1%", up: true },
              { commodity: "Maize", price: "₦420/kg", change: "-1.2%", up: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm font-medium">{item.commodity}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold">{item.price}</span>
                  <span className={`text-xs ml-2 ${item.up ? "text-green-600" : "text-red-600"}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Credit Hub Section ===== */
function CreditHubSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Credit & Financing Hub</h1>
        <p className="text-muted-foreground text-sm">Access cooperative-backed credit, BNPL, and manage collateral</p>
      </div>
      <CreditAssessment />
      <BNPLCalculator />
      <CollateralManager />
    </div>
  );
}

/* ===== Producer Section ===== */
function ProducerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Producer Portal</h1>
        <p className="text-muted-foreground text-sm">Manage your production capacity, inventory, and orders</p>
      </div>
      <CapacityDashboard />
      <InventoryPostForm />
      <OrdersReceived />
    </div>
  );
}

/* ===== Buyer Section ===== */
function BuyerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Buyer Portal</h1>
        <p className="text-muted-foreground text-sm">Track your orders and bulk purchase pools</p>
      </div>
      <MyOrders />
      <MyPools />
    </div>
  );
}